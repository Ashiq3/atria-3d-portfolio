import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import * as DRACO from 'draco3d';
import * as MESHOPT from 'meshoptimizer';
import { MeshoptOptimizer } from './meshopt-optimizer';
import { GLTFExtensionHandler } from './gltf-extensions';

export interface AssetLoadOptions {
  priority?: 'critical' | 'high' | 'medium' | 'low';
  cache?: boolean;
  preload?: boolean;
  optimize?: boolean;
  useExtensions?: boolean;
}

export interface LoadedAsset {
  asset: THREE.Group | THREE.Texture | any;
  type: 'model' | 'texture' | 'audio' | 'video';
  url: string;
  loadedAt: Date;
}

export class AssetLoader {
  private loader: GLTFLoader;
  private extensionHandler: GLTFExtensionHandler;
  private cache: Map<string, LoadedAsset>;
  private dracoDecoder: any;
  private meshoptDecoder: any;
  private meshoptOptimizer: MeshoptOptimizer;
  private loadingQueue: Map<string, Promise<LoadedAsset>>;
  private performanceBudget: {
    maxRequests: number;
    currentRequests: number;
    requestBudget: number;
  };

  constructor() {
    this.loader = new GLTFLoader();
    this.extensionHandler = new GLTFExtensionHandler(this.loader);
    this.cache = new Map();
    this.loadingQueue = new Map();
    this.meshoptOptimizer = new MeshoptOptimizer();
    this.performanceBudget = {
      maxRequests: 38,
      currentRequests: 0,
      requestBudget: 38
    };

    // Initialize compression libraries
    this.setupDracoCompression();
    this.setupMeshoptCompression();
  }

  private async setupDracoCompression(): Promise<void> {
    try {
      const dracoLoader = await DRACO.createDecoderModule({});
      this.dracoDecoder = dracoLoader;
      this.loader.setDRACOLoader(dracoLoader);
    } catch (error) {
      console.warn('Failed to initialize Draco compression:', error);
    }
  }

  private async setupMeshoptCompression(): Promise<void> {
    try {
      await MESHOPT.ready;
      this.meshoptDecoder = MESHOPT;
      // Enable Meshopt compression for GLTF loader
      this.loader.setMeshoptDecoder(MESHOPT);
    } catch (error) {
      console.warn('Failed to initialize Meshopt compression:', error);
    }
  }

  public async loadModel(url: string, options?: AssetLoadOptions): Promise<THREE.Group> {
    const asset = await this.loadAsset(url, 'model', options);
    return asset.asset as THREE.Group;
  }

  public async loadTexture(url: string, options?: AssetLoadOptions): Promise<THREE.Texture> {
    const asset = await this.loadAsset(url, 'texture', options);
    return asset.asset as THREE.Texture;
  }

  private async loadAsset(url: string, type: 'model' | 'texture' | 'audio' | 'video', options?: AssetLoadOptions): Promise<LoadedAsset> {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Check if already loading
    if (this.loadingQueue.has(url)) {
      return this.loadingQueue.get(url)!;
    }

    // Create loading promise
    const loadPromise = this.loadAssetInternal(url, type, options);
    this.loadingQueue.set(url, loadPromise);

    try {
      const result = await loadPromise;
      // Cache if requested
      if (options?.cache !== false) {
        this.cache.set(url, result);
      }
      // Remove from loading queue
      this.loadingQueue.delete(url);
      return result;
    } catch (error) {
      // Remove from loading queue on error
      this.loadingQueue.delete(url);
      throw error;
    }
  }

  private async loadAssetInternal(url: string, type: 'model' | 'texture' | 'audio' | 'video', options?: AssetLoadOptions): Promise<LoadedAsset> {
    // Check performance budget
    if (this.performanceBudget.currentRequests >= this.performanceBudget.requestBudget) {
      throw new Error(`Request budget exceeded. Current: ${this.performanceBudget.currentRequests}, Budget: ${this.performanceBudget.requestBudget}`);
    }

    this.performanceBudget.currentRequests++;

    try {
      return new Promise((resolve, reject) => {
        switch (type) {
          case 'model':
            if (options?.useExtensions) {
              // Use extension handler for loading
              this.extensionHandler.loadWithExtensions(url)
                .then(async (gltf) => {
                  let model = gltf.scene;
                  
                  // Apply Meshopt optimization if requested
                  if (options?.optimize) {
                    model = await this.meshoptOptimizer.optimizeModel(model);
                  }
                  
                  const loadedAsset: LoadedAsset = {
                    asset: model,
                    type: 'model',
                    url: url,
                    loadedAt: new Date()
                  };
                  this.performanceBudget.currentRequests--;
                  resolve(loadedAsset);
                })
                .catch((error) => {
                  this.performanceBudget.currentRequests--;
                  reject(error);
                });
            } else {
              // Standard loading
              this.loader.load(
                url,
                async (gltf) => {
                  let model = gltf.scene;
                  
                  // Apply Meshopt optimization if requested
                  if (options?.optimize) {
                    model = await this.meshoptOptimizer.optimizeModel(model);
                  }
                  
                  const loadedAsset: LoadedAsset = {
                    asset: model,
                    type: 'model',
                    url: url,
                    loadedAt: new Date()
                  };
                  this.performanceBudget.currentRequests--;
                  resolve(loadedAsset);
                },
                undefined,
                (error) => {
                  this.performanceBudget.currentRequests--;
                  reject(error);
                }
              );
            }
            break;

          case 'texture':
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
              url,
              (texture) => {
                const loadedAsset: LoadedAsset = {
                  asset: texture,
                  type: 'texture',
                  url: url,
                  loadedAt: new Date()
                };
                this.performanceBudget.currentRequests--;
                resolve(loadedAsset);
              },
              undefined,
              (error) => {
                this.performanceBudget.currentRequests--;
                reject(error);
              }
            );
            break;

          default:
            this.performanceBudget.currentRequests--;
            reject(new Error(`Unsupported asset type: ${type}`));
        }
      });
    } catch (error) {
      this.performanceBudget.currentRequests--;
      throw error;
    }
  }

  public async preloadCriticalAssets(assetUrls: string[]): Promise<void> {
    const criticalAssets = assetUrls.map(url => 
      this.loadAsset(url, 'model', { priority: 'critical', cache: true, preload: true })
    );
    
    try {
      await Promise.all(criticalAssets);
    } catch (error) {
      console.error('Failed to preload critical assets:', error);
      throw error;
    }
  }

  public async loadBackgroundAssets(assetUrls: string[]): Promise<void> {
    // Load background assets with lower priority
    for (const url of assetUrls) {
      // In a real implementation, we would use requestIdleCallback or similar
      // to load these assets when the browser is idle
      setTimeout(() => {
        this.loadAsset(url, 'model', { priority: 'low', cache: true })
          .catch(error => console.warn(`Failed to load background asset ${url}:`, error));
      }, 100);
    }
  }

  public getCacheStats(): { size: number, maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.performanceBudget.maxRequests
    };
  }

  public clearCache(): void {
    this.cache.clear();
  }
}
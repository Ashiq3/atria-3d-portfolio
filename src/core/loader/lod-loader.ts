import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { AssetLoader, AssetLoadOptions, LoadedAsset } from './asset-loader';
import { GLTFExtensionHandler } from './gltf-extensions';

export interface LODModel {
  levels: {
    distance: number;
    url: string;
    model?: THREE.Group;
  }[];
  currentLevel: number;
  lodObject: THREE.LOD;
}

export interface LODLoadOptions extends AssetLoadOptions {
  lodLevels?: {
    distance: number;
    url: string;
  }[];
}

export class LODLoader extends AssetLoader {
  private lodModels: Map<string, LODModel> = new Map();
  private extensionHandler: GLTFExtensionHandler;

  constructor() {
    super();
    this.extensionHandler = new GLTFExtensionHandler(new GLTFLoader());
  }

  /**
   * Load a model with LOD support
   * @param lodLevels Array of LOD levels with distance thresholds and model URLs
   * @param options Loading options
   * @returns Promise resolving to the base LOD model
   */
  public async loadLODModel(lodLevels: { distance: number; url: string }[], options?: LODLoadOptions): Promise<LODModel> {
    if (lodLevels.length === 0) {
      throw new Error('At least one LOD level is required');
    }

    // Sort LOD levels by distance (nearest first)
    const sortedLevels = [...lodLevels].sort((a, b) => a.distance - b.distance);

    const lodModel: LODModel = {
      levels: sortedLevels,
      currentLevel: 0,
      lodObject: new THREE.LOD()
    };

    // Load all LOD levels
    const loadPromises = sortedLevels.map(async (level) => {
      try {
        const model = await this.loadModel(level.url, { ...options, useExtensions: true });
        level.model = model;
        lodModel.lodObject.addLevel(model, level.distance);
        return model;
      } catch (error) {
        console.warn(`Failed to load LOD level at distance ${level.distance} from ${level.url}:`, error);
        throw error;
      }
    });

    try {
      await Promise.all(loadPromises);
    } catch (error) {
      console.error('Failed to load one or more LOD levels:', error);
      // Continue with partial LOD model if some levels loaded successfully
    }

    return lodModel;
  }

  /**
   * Create a THREE.LOD object from LOD levels
   * @param lodLevels Array of LOD levels with distance thresholds and model URLs
   * @returns Promise resolving to THREE.LOD object
   */
  public async createLODFromLevels(lodLevels: { distance: number; url: string }[]): Promise<THREE.LOD> {
    const lod = new THREE.LOD();
    
    // Sort LOD levels by distance (nearest first)
    const sortedLevels = [...lodLevels].sort((a, b) => a.distance - b.distance);

    // Load all LOD levels and add them to the LOD object
    for (const level of sortedLevels) {
      try {
        const loader = new GLTFLoader();
        // Use the same Draco decoder as the base AssetLoader
        if ((this as any).dracoDecoder) {
          loader.setDRACOLoader((this as any).dracoDecoder);
        }
        
        // Use extension handler for loading
        const gltf = await new Promise<THREE.GLTF>((resolve, reject) => {
          this.extensionHandler['loader'] = loader; // Temporarily set loader
          this.extensionHandler['loadWithExtensions'](level.url)
            .then(resolve)
            .catch(reject);
        });
        
        lod.addLevel(gltf.scene, level.distance);
      } catch (error) {
        console.warn(`Failed to load LOD level at distance ${level.distance} from ${level.url}:`, error);
      }
    }

    return lod;
  }

  /**
   * Preload LOD assets for critical models
   * @param lodAssets Array of LOD asset configurations
   */
  public async preloadCriticalLODAssets(lodAssets: { levels: { distance: number; url: string }[] }[]): Promise<void> {
    const promises = lodAssets.map(asset => 
      this.createLODFromLevels(asset.levels)
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error('Failed to preload critical LOD assets:', error);
      throw error;
    }
  }

  /**
   * Stream LOD assets based on priority and distance
   * @param lodAssets Array of LOD asset configurations grouped by priority
   */
  public async streamLODAssets(lodAssets: { 
    critical: { levels: { distance: number; url: string }[] }[];
    high: { levels: { distance: number; url: string }[] }[];
    medium: { levels: { distance: number; url: string }[] }[];
    low: { levels: { distance: number; url: string }[] }[];
  }): Promise<void> {
    // Load critical assets first
    await this.preloadCriticalLODAssets(lodAssets.critical);

    // Load high priority assets after critical ones
    for (const asset of lodAssets.high) {
      this.createLODFromLevels(asset.levels)
        .catch(error => console.warn('Failed to load high priority LOD asset:', error));
    }

    // Load medium priority assets with a delay
    setTimeout(() => {
      for (const asset of lodAssets.medium) {
        this.createLODFromLevels(asset.levels)
          .catch(error => console.warn('Failed to load medium priority LOD asset:', error));
      }
    }, 1000);

    // Load low priority assets in background
    setTimeout(() => {
      for (const asset of lodAssets.low) {
        this.createLODFromLevels(asset.levels)
          .catch(error => console.warn('Failed to load low priority LOD asset:', error));
      }
    }, 3000);
  }
}
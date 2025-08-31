import * as THREE from 'three';
import { createWebGPURenderer, createWebGLRenderer } from '../renderer';
import { LODLoader } from '../loader/lod-loader';

export interface EngineConfig {
  container?: HTMLElement;
  useWebGPU?: boolean;
  performanceBudget?: {
    maxFPS: number;
    maxMemoryMB: number;
    maxRequests: number;
  };
}

export class AtriaEngine {
  private renderer: THREE.WebGPURenderer | THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private loader: LODLoader;
  private clock: THREE.Clock;
  private config: EngineConfig;
  private container: HTMLElement;
  private animationCallbacks: Set<(deltaTime: number) => void> = new Set();

  constructor(config?: EngineConfig) {
    this.config = {
      useWebGPU: true,
      performanceBudget: {
        maxFPS: 60,
        maxMemoryMB: 512,
        maxRequests: 38
      },
      ...config
    };
    
    this.container = this.config.container || document.body;
    this.clock = new THREE.Clock();
  }

  public async initialize(): Promise<void> {
    // Initialize renderer
    if (this.config.useWebGPU) {
      try {
        this.renderer = await createWebGPURenderer();
      } catch (error) {
        console.warn('WebGPU not available, falling back to WebGL2:', error);
        this.renderer = createWebGLRenderer();
      }
    } else {
      this.renderer = createWebGLRenderer();
    }

    this.container.appendChild(this.renderer.domElement);

    // Initialize scene and camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Initialize loader
    this.loader = new LODLoader();

    // Set up event listeners
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): THREE.WebGPURenderer | THREE.WebGLRenderer {
    return this.renderer;
  }

  public getLoader(): LODLoader {
    return this.loader;
  }

  public addAnimationCallback(callback: (deltaTime: number) => void): void {
    this.animationCallbacks.add(callback);
  }

  public removeAnimationCallback(callback: (deltaTime: number) => void): void {
    this.animationCallbacks.delete(callback);
  }

  public animate(): void {
    requestAnimationFrame(() => this.animate());

    const deltaTime = this.clock.getDelta();

    // Execute all animation callbacks
    this.animationCallbacks.forEach(callback => {
      callback(deltaTime);
    });

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  public dispose(): void {
    // Clean up resources
    this.animationCallbacks.clear();
    
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    // Remove event listeners
    window.removeEventListener('resize', this.onWindowResize);
  }
}
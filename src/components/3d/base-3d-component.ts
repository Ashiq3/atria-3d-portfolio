import * as THREE from 'three';
import { AtriaEngine } from '../../core/engine';

export interface Component3DConfig {
  position?: THREE.Vector3;
  rotation?: THREE.Vector3;
  scale?: THREE.Vector3;
  visible?: boolean;
}

export abstract class Base3DComponent {
  protected engine: AtriaEngine;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGPURenderer | THREE.WebGLRenderer;
  protected group: THREE.Group;
  protected config: Component3DConfig;

  constructor(engine: AtriaEngine, config?: Component3DConfig) {
    this.engine = engine;
    this.scene = engine.getScene();
    this.camera = engine.getCamera();
    this.renderer = engine.getRenderer();
    
    this.config = {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      scale: new THREE.Vector3(1, 1, 1),
      visible: true,
      ...config
    };

    this.group = new THREE.Group();
    this.group.position.copy(this.config.position || new THREE.Vector3(0, 0, 0));
    this.group.rotation.copy(this.config.rotation || new THREE.Vector3(0, 0, 0));
    this.group.scale.copy(this.config.scale || new THREE.Vector3(1, 1, 1));
    this.group.visible = this.config.visible || true;
  }

  public getGroup(): THREE.Group {
    return this.group;
  }

  public setPosition(position: THREE.Vector3): void {
    this.group.position.copy(position);
  }

  public setRotation(rotation: THREE.Vector3): void {
    this.group.rotation.copy(rotation);
  }

  public setScale(scale: THREE.Vector3): void {
    this.group.scale.copy(scale);
  }

  public setVisible(visible: boolean): void {
    this.group.visible = visible;
  }

  public abstract initialize(): Promise<void>;
  public abstract update(deltaTime: number): void;
  public abstract dispose(): void;
}
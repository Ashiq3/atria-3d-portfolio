import * as THREE from 'three';

export async function createWebGPURenderer(): Promise<THREE.WebGLRenderer> {
  // For now, fall back to WebGL renderer since WebGPU implementation is not provided
  console.warn('WebGPU renderer not implemented, falling back to WebGL');
  return createWebGLRenderer();
}

export function createWebGLRenderer(): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Set up basic rendering parameters
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  return renderer;
}
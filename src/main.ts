import './style.css';
import * as THREE from 'three';
import { AtriaEngine } from './core/engine';

async function main() {
  // Initialize the engine
  const engine = new AtriaEngine();
  
  try {
    await engine.initialize();
    console.log('Engine initialized successfully');
  } catch (error) {
    console.error('Failed to initialize engine:', error);
    return;
  }

  const scene = engine.getScene();
  const camera = engine.getCamera();
  const loader = engine.getLoader();

  // Set up basic lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Demonstrate asset loading system with extensions
  try {
    // Preload critical assets (in a real implementation, these would be actual asset URLs)
    const criticalAssets = [
      '/assets/3d/hero-scene/liquid-glass-atrium.draco.glb',
      '/assets/3d/hero-scene/obsidian-prism.draco.glb'
    ];
    
    console.log('Preloading critical assets...');
    await loader.preloadCriticalAssets(criticalAssets);
    console.log('Critical assets preloaded successfully');
    
    // Load a model with custom extensions for display
    const model = await loader.loadModel('/assets/3d/hero-scene/obsidian-prism.draco.glb', {
      useExtensions: true,
      optimize: true
    });
    model.position.set(0, 0, 0);
    scene.add(model);
    
    // Load background assets (in a real implementation, these would be actual asset URLs)
    const backgroundAssets = [
      '/assets/3d/projects/project-01/diorama.draco.glb',
      '/assets/3d/projects/project-02/diorama.draco.glb'
    ];
    
    console.log('Loading background assets...');
    loader.loadBackgroundAssets(backgroundAssets);
    
    // Display cache stats
    const cacheStats = loader.getCacheStats();
    console.log(`Asset cache: ${cacheStats.size}/${cacheStats.maxSize} assets loaded`);
  } catch (error) {
    console.error('Asset loading failed:', error);
  }

  camera.position.z = 5;

  // Add a simple animation callback
  engine.addAnimationCallback((deltaTime) => {
    // Rotate all models in the scene
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.rotation.x += deltaTime * 0.5;
        object.rotation.y += deltaTime * 0.5;
      }
    });
  });

  // Start the animation loop
  engine.animate();
}

main();
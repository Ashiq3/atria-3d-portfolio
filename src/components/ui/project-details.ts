import { BaseUIComponent } from './base-ui-component';
import { AtriaEngine } from '../../core/engine';
import { ObjectInteraction } from '../3d/object-interaction';
import { AudioManager } from '../../utils/audio/audio-manager';
import * as THREE from 'three';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  details: string;
  images: string[];
  technologies: string[];
}

export class ProjectDetails extends BaseUIComponent {
  private audioManager: AudioManager;
  private projectId: string;
  private projectData: ProjectData | null = null;
  private objectInteraction: ObjectInteraction | null = null;

  constructor(engine: AtriaEngine, projectId: string, audioManager: AudioManager) {
    super(engine);
    this.audioManager = audioManager;
    this.projectId = projectId;
    this.init();
    this.loadProjectData();
  }

  protected createElement(): HTMLElement {
    const details = document.createElement('div');
    details.className = 'project-details';
    details.setAttribute('role', 'main');
    details.setAttribute('aria-label', 'Project details');
    
    // Show loading state initially
    details.innerHTML = `
      <div class="loading">
        <p>Loading project details...</p>
      </div>
    `;
    
    return details;
  }

  protected setupEventListeners(): void {
    // Add event listener for back button
    const backButton = this.element.querySelector('#back-to-projects');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.goBackToProjects();
      });
    }
  }

  private loadProjectData(): void {
    // In a real implementation, this would fetch from an API
    // For now, we'll use mock data
    setTimeout(() => {
      this.projectData = {
        id: this.projectId,
        title: `Project ${this.projectId}`,
        description: 'A beautiful 3D project showcasing advanced techniques',
        details: 'This project demonstrates the use of advanced 3D rendering techniques, including realistic lighting, complex geometries, and interactive elements. The implementation uses Three.js with WebGL for optimal performance across different devices.',
        images: [
          '/assets/images/project-1-thumb.jpg',
          '/assets/images/project-2-thumb.jpg'
        ],
        technologies: ['Three.js', 'WebGL', 'GLTF', 'WebGPU']
      };
      
      this.renderProjectDetails();
    }, 500);
  }

  private async renderProjectDetails(): void {
    if (!this.projectData) return;
    
    this.element.innerHTML = `
      <div class="project-header glass-morph">
        <button id="back-to-projects" class="back-button magnet-effect" aria-label="Back to projects">
          ← Back to Projects
        </button>
        <h2 class="project-title">${this.projectData.title}</h2>
      </div>
      
      <div class="project-content">
        <div class="project-3d-viewer glass-morph">
          <div id="model-container" class="model-container"></div>
          <p class="interaction-hint">Click and drag to rotate the model. Click on objects to select them.</p>
        </div>
        
        <p class="project-description glass-morph">${this.projectData.description}</p>
        
        <div class="project-images">
          ${this.projectData.images.map(img => `
            <div class="project-image glass-morph">
              <img src="${img}" alt="${this.projectData?.title}" loading="lazy">
            </div>
          `).join('')}
        </div>
        
        <div class="project-details-text glass-morph">
          <p>${this.projectData.details}</p>
        </div>
        
        <div class="project-technologies glass-morph">
          <h3>Technologies Used</h3>
          <ul class="tech-list">
            ${this.projectData.technologies.map(tech => `<li>${tech}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    // Re-setup event listeners after re-rendering
    this.setupEventListeners();
    
    // Load and display 3D model
    await this.load3DModel();
  }

  private goBackToProjects(): void {
    // Dispatch custom event for page navigation
    const event = new CustomEvent('page-navigate', {
      detail: { page: 'projects' }
    });
    window.dispatchEvent(event);
  }
  
  private async load3DModel(): Promise<void> {
    try {
      // Clear any existing models from the scene
      const sceneGraph = this.engine.getSceneGraph();
      sceneGraph.clear();
      
      // Load the 3D model (using portfolio-showcase as placeholder)
      const loader = this.engine.getLoader();
      const model = await loader.loadModel('/assets/3d/portfolio-showcase.glb');
      
      // Add model to scene
      sceneGraph.addObject('project-model', model);
      
      // Add lighting for the model
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.engine.getScene().add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      this.engine.getScene().add(directionalLight);
      
      // Set up camera position
      this.engine.getCamera().position.set(0, 0, 5);
      this.engine.getCamera().lookAt(0, 0, 0);
      
      // Initialize object interaction
      if (this.objectInteraction) {
        this.objectInteraction.dispose();
      }
      this.objectInteraction = new ObjectInteraction(this.engine, this.audioManager);
      
      console.log('3D model loaded successfully for project:', this.projectId);
    } catch (error) {
      console.error('Failed to load 3D model:', error);
      
      // Create a fallback cube if model fails to load
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0x646cff,
        roughness: 0.2,
        metalness: 0.8
      });
      
      const cube = new THREE.Mesh(geometry, material);
      this.engine.getSceneGraph().addObject('fallback-cube', cube);
      
      // Add lighting for fallback cube
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.engine.getScene().add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      this.engine.getScene().add(directionalLight);
      
      // Initialize object interaction
      if (this.objectInteraction) {
        this.objectInteraction.dispose();
      }
      this.objectInteraction = new ObjectInteraction(this.engine, this.audioManager);
    }
  }

  public dispose(): void {
    if (this.objectInteraction) {
      this.objectInteraction.dispose();
      this.objectInteraction = null;
    }
    super.dispose();
  }
}
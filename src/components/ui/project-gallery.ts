import { BaseUIComponent } from './base-ui-component';
import { AtriaEngine } from '../../core/engine';
import { GalleryItem, type GalleryItemData } from './gallery-item';
import { AudioManager } from '../../utils/audio/audio-manager';

export class ProjectGallery extends BaseUIComponent {
  private audioManager: AudioManager;
  private items: GalleryItem[] = [];
  private galleryData: GalleryItemData[] = [];

  constructor(engine: AtriaEngine, audioManager: AudioManager) {
    super(engine);
    this.audioManager = audioManager;
    this.init();
    this.loadGalleryData();
  }

  protected createElement(): HTMLElement {
    const gallery = document.createElement('div');
    gallery.className = 'project-gallery';
    gallery.setAttribute('role', 'region');
    gallery.setAttribute('aria-label', 'Project gallery');
    
    gallery.innerHTML = `
      <div class="gallery-header glass-morph">
        <h2 class="gallery-title">Projects</h2>
        <div class="gallery-filters">
          <button class="filter-btn active magnet-effect" data-filter="all">All</button>
          <button class="filter-btn magnet-effect" data-filter="3d">3D Art</button>
          <button class="filter-btn magnet-effect" data-filter="web">Web</button>
          <button class="filter-btn magnet-effect" data-filter="animation">Animation</button>
        </div>
      </div>
      <div class="gallery-grid" role="list"></div>
    `;

    return gallery;
  }

  protected setupEventListeners(): void {
    // Add event listeners to filter buttons
    const filterButtons = this.element.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        this.setActiveFilter(target);
        const filter = target.getAttribute('data-filter') || 'all';
        this.filterItems(filter);
      });
    });

    // Listen for project view events
    window.addEventListener('project-view', (event: CustomEvent) => {
      this.handleProjectView(event.detail.projectId);
    });
  }

  private loadGalleryData(): void {
    // In a real implementation, this would fetch from an API
    // For now, we'll use mock data for the 6 flagship projects
    this.galleryData = [
      {
        id: 'project-1',
        title: 'Lumina Atrium',
        description: 'A light-filled architectural space featuring a crystalline glass ceiling that refracts natural light into a spectrum of colors throughout the day',
        thumbnail: '/assets/images/project-1-thumb.jpg',
        category: '3D Art'
      },
      {
        id: 'project-2',
        title: 'Obsidian Prism',
        description: 'A monolithic structure that appears to absorb light, creating an illusion of depth and mystery through carefully calculated geometric fractures',
        thumbnail: '/assets/images/project-2-thumb.jpg',
        category: '3D Art'
      },
      {
        id: 'project-3',
        title: 'Ethereal Corridor',
        description: 'An infinite hallway where walls dissolve into particle systems, creating a seamless transition between physical and digital realms',
        thumbnail: '/assets/images/project-3-thumb.jpg',
        category: 'Animation'
      },
      {
        id: 'project-4',
        title: 'Fractal Garden',
        description: 'An interactive landscape where visitors can manipulate mathematical patterns to grow organic forms in real-time',
        thumbnail: '/assets/images/project-4-thumb.jpg',
        category: 'Web'
      },
      {
        id: 'project-5',
        title: 'Neural Nexus',
        description: 'A visualization of interconnected thoughts and ideas, represented through flowing light streams and pulsating nodes',
        thumbnail: '/vite.svg', // Placeholder until we have actual thumbnails
        category: 'Animation'
      },
      {
        id: 'project-6',
        title: 'Quantum Chamber',
        description: 'A space where the laws of physics bend and fold, creating impossible geometries and shifting perspectives',
        thumbnail: '/vite.svg', // Placeholder until we have actual thumbnails
        category: '3D Art'
      }
    ];

    this.renderItems();
  }

  private renderItems(): void {
    const grid = this.element.querySelector('.gallery-grid') as HTMLElement;
    grid.innerHTML = '';

    this.items = this.galleryData.map(data => {
      const item = new GalleryItem(this.engine, data);
      grid.appendChild(item.getElement());
      return item;
    });
  }

  private setActiveFilter(button: HTMLElement): void {
    // Remove active class from all buttons
    const buttons = this.element.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
  }

  private filterItems(category: string): void {
    const grid = this.element.querySelector('.gallery-grid') as HTMLElement;
    grid.innerHTML = '';

    const filteredItems = category === 'all' 
      ? this.items 
      : this.items.filter(item => item.getData().category.toLowerCase() === category);

    filteredItems.forEach(item => {
      grid.appendChild(item.getElement());
    });
  }

  private handleProjectView(projectId: string): void {
    // Dispatch custom event for page navigation to project details
    const event = new CustomEvent('page-navigate', {
      detail: { page: 'project-details', projectId }
    });
    window.dispatchEvent(event);
  }

  public dispose(): void {
    this.items.forEach(item => item.dispose());
    this.items = [];
    super.dispose();
  }
}
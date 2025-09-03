import { BaseUIComponent } from './base-ui-component';
import { AtriaEngine } from '../../core/engine';
import { AudioManager } from '../../utils/audio/audio-manager';

export class MainMenu extends BaseUIComponent {
  private audioManager: AudioManager;

  constructor(engine: AtriaEngine, audioManager: AudioManager) {
    super(engine);
    this.audioManager = audioManager;
    this.init();
  }

  protected createElement(): HTMLElement {
    const menu = document.createElement('nav');
    menu.className = 'main-menu bento-nav';
    menu.setAttribute('role', 'navigation');
    menu.setAttribute('aria-label', 'Main navigation');

    menu.innerHTML = `
      <div class="nav-container">
        <div class="nav-brand">
          <h2>ATRIA</h2>
        </div>
        <div class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" tabindex="0" role="button">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="nav-menu-wrapper">
          <ul class="menu-items">
            <li class="nav-item"><a href="#home" data-page="home" class="nav-link bento-nav-item active">Home</a></li>
            <li class="nav-item"><a href="#projects" data-page="projects" class="nav-link bento-nav-item">Projects</a></li>
            <li class="nav-item"><a href="#about" data-page="about" class="nav-link bento-nav-item">About</a></li>
            <li class="nav-item"><a href="#contact" data-page="contact" class="nav-link bento-nav-item">Contact</a></li>
          </ul>
          <div class="nav-highlight"></div>
        </div>
      </div>
    `;

    return menu;
  }

  protected setupEventListeners(): void {
    const menuToggle = this.element.querySelector('.menu-toggle') as HTMLElement;
    const navMenuWrapper = this.element.querySelector('.nav-menu-wrapper') as HTMLElement;

    menuToggle.addEventListener('click', () => {
      this.toggleMenu();
    });

    menuToggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.toggleMenu();
      }
    });

    // Add event listeners to menu items
    const links = this.element.querySelectorAll('a[data-page]');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = (event.target as HTMLElement).getAttribute('data-page');
        if (page) {
          // Update active state
          this.updateActiveState(link as HTMLElement);
          this.navigateToPage(page);
        }
      });
    });
  }

  private toggleMenu(): void {
    const navMenuWrapper = this.element.querySelector('.nav-menu-wrapper') as HTMLElement;
    const menuToggle = this.element.querySelector('.menu-toggle') as HTMLElement;
    
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    navMenuWrapper.classList.toggle('active');
    
    // Play audio when menu is toggled
    // In a real implementation, we would load and play specific UI sounds
    // For now, we'll just log that audio would be played
    console.log('Menu toggle audio would play here');
  }

  private updateActiveState(activeLink: HTMLElement): void {
    // Remove active class from all links
    const allLinks = this.element.querySelectorAll('.bento-nav-item');
    allLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
  }

  private navigateToPage(page: string): void {
    // Hide mobile menu if open
    const navMenuWrapper = this.element.querySelector('.nav-menu-wrapper') as HTMLElement;
    const menuToggle = this.element.querySelector('.menu-toggle') as HTMLElement;
    
    navMenuWrapper.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Play navigation sound
    console.log('Navigation audio would play here');
    
    // Dispatch custom event for page navigation
    const event = new CustomEvent('page-navigate', {
      detail: { page }
    });
    window.dispatchEvent(event);
  }
}
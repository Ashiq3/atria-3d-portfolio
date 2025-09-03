import { BaseUIComponent } from './base-ui-component';
import { AtriaEngine } from '../../core/engine';
import { AudioManager } from '../../utils/audio/audio-manager';

export class AboutPage extends BaseUIComponent {
  private audioManager: AudioManager;

  constructor(engine: AtriaEngine, audioManager: AudioManager) {
    super(engine);
    this.audioManager = audioManager;
    this.init();
  }

  protected createElement(): HTMLElement {
    const about = document.createElement('div');
    about.className = 'about-page';
    about.setAttribute('role', 'main');
    about.setAttribute('aria-label', 'About page');

    about.innerHTML = `
      <div class="bento-about-grid">
        <div class="bento-about-card header-card fade-in glass-morph">
          <h1 class="about-title">About ATRIA</h1>
          <p class="about-subtitle">Creative Developer & 3D Artist</p>
        </div>
        
        <div class="bento-about-card journey-card slide-in-left glass-morph">
          <h2 class="section-title">My Journey</h2>
          <p class="section-text">
            I'm a creative developer specializing in immersive 3D experiences and interactive web applications.
            With a background in both design and engineering, I bridge the gap between artistic vision and
            technical implementation.
          </p>
          <p class="section-text">
            My work focuses on pushing the boundaries of what's possible in the browser, leveraging
            cutting-edge technologies like WebGPU, WebGL, and real-time rendering to create stunning
            visual experiences.
          </p>
        </div>
        
        <div class="bento-about-card skills-card slide-in-right glass-morph">
          <h2 class="section-title">Skills & Expertise</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <h3 class="skill-title">3D Development</h3>
              <ul class="skill-list">
                <li>WebGL/WebGPU</li>
                <li>Three.js</li>
                <li>GLTF/GLB</li>
                <li>Real-time Rendering</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bento-about-card tech-card slide-in-left glass-morph">
          <h2 class="section-title">Web Technologies</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <ul class="skill-list">
                <li>TypeScript</li>
                <li>React/Vue</li>
                <li>CSS/SCSS</li>
                <li>Performance Optimization</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bento-about-card tools-card slide-in-right glass-morph">
          <h2 class="section-title">Creative Tools</h2>
          <div class="skills-grid">
            <div class="skill-category">
              <ul class="skill-list">
                <li>Blender</li>
                <li>Substance Painter</li>
                <li>Photoshop</li>
                <li>After Effects</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="bento-about-card philosophy-card fade-in glass-morph">
          <h2 class="section-title">Philosophy</h2>
          <blockquote class="philosophy-quote">
            "Technology should enhance human creativity, not replace it. The most powerful experiences
            emerge when art and code work in harmony."
          </blockquote>
        </div>
      </div>
    `;

    return about;
  }

  protected setupEventListeners(): void {
    // No specific event listeners needed for the about page
  }
}
# Project Structure

## Directory Layout

```
/src
  /assets        # 3D models, textures, and media
    /3d          # 3D models (glTF, USDZ, Draco compressed)
    /textures    # Texture maps (PBR materials)
    /videos      # Cinemagraphs and video assets
    /images      # Static images and renders
  /components    # Reusable 3D and UI components
    /3d          # 3D components (geometries, materials, shaders)
    /ui          # UI components (buttons, navigation, overlays)
  /core          # Core 3D engine and utilities
    /engine      # Custom Three.js extensions
    /renderer    # WebGPU/WebGL renderer setup
    /loader      # Asset loading and streaming
 /pages         # Website pages
    /home        # Homepage components
    /projects    # Project showcase pages
    /about       # About and contact pages
  /styles        # CSS and styling assets
    /base        # Base styles and resets
    /components  # Component-specific styles
    /themes      # Theme configurations
  /utils         # Helper functions
    /math        # Mathematical utilities
    /animation   # Animation helpers
    /accessibility # Accessibility utilities
/public          # Static assets
  /fonts         # Custom fonts
  /icons         # SVG icons
  /media         # Public media assets
/docs            # Documentation and mood boards
  /moodboards    # Visual design references
  /storyboards   # UX flow diagrams
  /technical     # Technical specifications
/tests           # Test files
  /unit          # Unit tests
  /e2e           # End-to-end tests
```

## File Naming Conventions

- Use PascalCase for component files (e.g., GlassPrism.jsx)
- Use kebab-case for style files (e.g., glass-prism.css)
- Use snake_case for 3D asset files (e.g., glass_prism.glb)
- Use UPPERCASE for environment variables and constants

## Asset Organization

### 3D Assets
```
/assets/3d/
  /hero-scene/       # Main hero animation assets
  /projects/         # Individual project models
    /project-01/     # Assets for project 01
    /project-02/     # Assets for project 02
    ...
  /ui-elements/      # 3D UI components
```

### Textures
```
/assets/textures/
  /materials/        # PBR material sets
  /environments/     # HDRI environment maps
  /ui/              # UI texture assets
```

## Component Architecture

```
/components/
  /3d/
    /hero/          # Hero scene components
      GlassPrism.js
      LiquidMetalMonolith.js
      GalleryCorridor.js
    /projects/      # Project showcase components
    /ui/            # 3D UI components
      InteractiveButton.js
      GlassMorphPanel.js
  /ui/
    /navigation/    # Navigation components
    /overlays/      # Modal and overlay components
    /typography/    # Text components
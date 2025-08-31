# ATRIA - Luxury 3D Portfolio Website

Light Carved in Memory

## Project Overview

This is a luxury 3D portfolio website for ATRIA, an architectural studio specializing in light-filled void spaces. The website features a fully interactive 3D experience with photorealistic rendering, cinematic animations, and premium design elements.

## Technical Specifications

- Three.js r163 with WebGPU renderer
- WebGL2 fallback for broader compatibility
- LOD streaming via Google Draco compression
- Custom Meshopt optimization
- Vite development environment
- AWS CloudFront + S3 hosting

## Project Structure

```
/src
  /assets        # 3D models, textures, and media
  /components    # Reusable 3D and UI components
  /core          # Core 3D engine and utilities
  /pages         # Website pages
  /styles        # CSS and styling assets
  /utils         # Helper functions
/public          # Static assets
/docs            # Documentation and mood boards
```

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## GitHub Repository Setup

To set up the GitHub repository, you can use the provided scripts:

### Windows:
```bash
scripts\setup-github.bat
```

### macOS/Linux:
```bash
chmod +x scripts/setup-github.sh
./scripts/setup-github.sh
```

Alternatively, you can manually create a private repository named "atria-3d-portfolio" on GitHub and follow these steps:

1. Create a new private repository on GitHub
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/your-username/atria-3d-portfolio.git
   ```
3. Push the code:
   ```bash
   git push -u origin main
   ```

After setting up the repository, configure the following:
- Branch protection rules for the main branch
- Repository secrets for AWS deployment
- GitHub project board for task tracking
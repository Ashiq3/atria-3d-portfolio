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
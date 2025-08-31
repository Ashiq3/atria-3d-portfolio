# Technical Architecture

## Overview

The ATRIA website is built on a modern web stack optimized for high-performance 3D rendering. The architecture is designed to deliver a seamless 60fps experience on high-end devices while gracefully degrading to 30fps on mobile devices.

## Core Technologies

### Rendering Engine
- **Primary**: Three.js r163 with WebGPU renderer
- **Fallback**: WebGL2 renderer for broader compatibility
- **Optimization**: InstancedMesh for repeated geometries
- **Streaming**: LOD (Level of Detail) streaming via Google Draco compression

### Build Tools
- **Bundler**: Vite for lightning-fast development and production builds
- **Transpiler**: Babel for JavaScript/TypeScript compilation
- **Preprocessor**: Sass for advanced CSS features

### Asset Pipeline
- **Compression**: Google Draco for 3D mesh compression
- **Optimization**: Custom Meshopt for additional size reduction
- **Formats**: glTF 2.0 with custom extensions for advanced materials

## System Architecture

### Frontend Stack
```
┌─────────────────────────────────────────────┐
│                 Browser                     │
├─────────────────────────────────────────────┤
│           Three.js + WebGPU/WebGL           │
├─────────────────────────────────────┤
│           Custom Engine Layer               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │  Renderer │ │   Loader  │ │ Animation │  │
│ └───────────┘ └───────────┘ └───────────┘  │
├─────────────────────────────────────────────┤
│             Component Layer                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │   3D Core │ │    UI     │ │Utilities  │  │
│  └───────────┘ └───────────┘ └───────────┘  │
├─────────────────────────────────────────────┤
│              Asset Pipeline                 │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │   Draco   │ │  Meshopt  │ │  glTF     │  │
│  └───────────┘ └───────────┘ └───────────┘  │
└─────────────────────────────────────────────┘
```

### Rendering Pipeline
```
1. Asset Loading
   ├── Preload critical assets (≤ 1.2 MB)
   ├── Stream non-critical assets in background
   └── Cache assets in Service Worker

2. Scene Initialization
   ├── Initialize WebGPU/WebGL context
   ├── Setup camera and lighting
   ├── Load hero scene assets
   └── Render first frame

3. Animation Loop
   ├── Input processing (scroll, mouse, touch)
   ├── Physics simulation (if any)
   ├── Scene updates
   ├── Rendering
   └── Post-processing effects

4. User Interaction
   ├── Magnet cursor effects
   ├── Glass-morph transitions
   ├── Scroll-based animations
   └── Keyboard navigation
```

## Performance Targets

### Frame Budget
- **Target**: 60 fps (16.67 ms per frame)
- **Fallback**: 30 fps (33.33 ms per frame)
- **Frame Allocation**:
  - Input processing: 2 ms
  - Physics/update: 3 ms
  - Rendering: 10 ms
  - Post-processing: 1.67 ms

### Memory Management
- **Texture Budget**: ≤ 512 MB GPU memory
- **Geometry Budget**: ≤ 256 MB GPU memory
- **JavaScript Heap**: ≤ 128 MB

## Accessibility Architecture

### Screen Reader Support
- Alt-3D JSON descriptors for all interactive 3D elements
- Invisible focus planes for keyboard navigation
- Semantic HTML structure beneath 3D canvas

### Reduced Motion Support
- Prefers-reduced-motion media query detection
- Static 8K still fallback for 3D hero sequence
- Disabled inertia scroll and micro-interactions

## Hosting Architecture

### CDN Strategy
- **Primary**: AWS CloudFront with S3 Intelligent-Tiering
- **Edge Functions**: Lambda@Edge for request processing
- **Compression**: Brotli and Gzip for text assets

### Asset Optimization
- **Images**: WebP with AVIF fallback
- **Videos**: H.265 with H.264 fallback
- **3D Assets**: Draco-compressed glTF with Meshopt
- **Fonts**: WOFF2 with WOFF fallback

## Security Considerations

### Content Security
- Strict Content Security Policy (CSP)
- Subresource Integrity (SRI) for external assets
- Secure cross-origin resource sharing (CORS)

### Data Protection
- Client-side only architecture (no user data collection)
- Secure context (HTTPS only)
- Feature policy restrictions

## Monitoring and Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Custom 3D performance metrics
- Frame timing API integration

### Error Handling
- Global error boundary for 3D components
- Fallback to static content on WebGL errors
- Detailed error logging with context
# Performance Budget

## Overview

The performance budget ensures the ATRIA website delivers a premium experience while maintaining fast load times and smooth interactions across all target devices.

## Critical Path Budget

### Initial Load (≤ 1.2 MB)
| Asset Type | Size Budget | Count | Total Size |
|------------|-------------|-------|------------|
| HTML | 10 KB | 1 | 10 KB |
| Critical CSS | 20 KB | 1 | 20 KB |
| Core JavaScript | 200 KB | 1 | 200 KB |
| Hero 3D Scene | 800 KB | 1 | 800 KB |
| Logo SVG | 5 KB | 1 | 5 KB |
| Favicon | 5 KB | 1 | 5 KB |
| **Total** | | | **1,040 KB** |

### Extended Load (≤ 4.3 MB)
| Asset Type | Size Budget | Count | Total Size |
|------------|-------------|-------|------------|
| Critical Path | - | - | 1,040 KB |
| Additional 3D Assets | 200 KB | 6 | 1,200 KB |
| Project Textures | 150 KB | 6 | 900 KB |
| UI Components | 50 KB | 12 | 600 KB |
| Fonts | 30 KB | 2 | 60 KB |
| Icons | 10 KB | 1 | 10 KB |
| Documentation JSON | 20 KB | 6 | 120 KB |
| **Total** | | | **4,130 KB** |

## Frame Budget (60 FPS Target)

### 16.67ms per Frame Allocation
| Process | Time Budget | Priority |
|---------|-------------|----------|
| Input Processing | 2.0 ms | High |
| Physics/Animation | 3.0 ms | High |
| Scene Update | 2.5 ms | High |
| Rendering | 8.0 ms | Critical |
| Post-Processing | 1.17 ms | Medium |
| **Total** | **16.67 ms** | |

## Memory Budget

### GPU Memory (512 MB Total)
| Asset Type | Budget | Usage |
|------------|--------|-------|
| Textures | 256 MB | 50% |
| Geometry | 128 MB | 25% |
| Framebuffers | 64 MB | 12.5% |
| Shaders | 32 MB | 6.25% |
| Other | 32 MB | 6.25% |
| **Total** | **512 MB** | **100%** |

### JavaScript Heap (128 MB Total)
| Component | Budget | Usage |
|-----------|--------|-------|
| Three.js Core | 40 MB | 31.25% |
| 3D Assets | 35 MB | 27.34% |
| UI Framework | 25 MB | 19.53% |
| Application State | 15 MB | 11.72% |
| Utilities | 8 MB | 6.25% |
| Debug Tools | 5 MB | 3.91% |
| **Total** | **128 MB** | **100%** |

## Network Budget

### Load Time Targets
| Connection Speed | Target Load Time | Budget |
|------------------|------------------|--------|
| Fiber/5G (100 Mbps) | 1.5 seconds | 18.75 MB |
| 4G (20 Mbps) | 3.0 seconds | 7.5 MB |
| 3G (5 Mbps) | 8.0 seconds | 5.0 MB |

### Request Budget
| Resource Type | Count Budget | Priority |
|---------------|--------------|----------|
| HTML Documents | 1 | Critical |
| CSS Files | 2 | High |
| JavaScript Files | 5 | High |
| 3D Model Files | 12 | Medium |
| Image Files | 18 | Medium |
| Font Files | 2 | Low |
| **Total** | **38** | |

## Device Targets

### Primary Devices
1. **Apple MacBook Pro 14" (M1)**
   - Load Time: ≤ 1.2 seconds
   - Frame Rate: 60 FPS
   - Memory Usage: ≤ 90% GPU

2. **iPad Pro 12.9" (M2)**
   - Load Time: ≤ 1.8 seconds
   - Frame Rate: 60 FPS (30 FPS acceptable)
   - Memory Usage: ≤ 85% GPU

### Secondary Devices
1. **Samsung Galaxy S24 Ultra**
   - Load Time: ≤ 2.5 seconds
   - Frame Rate: 45 FPS (30 FPS acceptable)
   - Memory Usage: ≤ 80% GPU

2. **Dell XPS 15 (RTX 4070)**
   - Load Time: ≤ 1.5 seconds
   - Frame Rate: 60 FPS
   - Memory Usage: ≤ 90% GPU

## Optimization Strategies

### Critical Path Optimization
- Inline critical CSS and JavaScript
- Preload hero scene assets
- Use HTTP/2 server push for critical assets
- Implement service worker caching

### 3D Asset Optimization
- Draco compression for all geometry
- Meshopt for additional size reduction
- Level of Detail (LOD) for complex models
- Texture compression (KTX2/Basis Universal)

### Code Splitting
- Vendor chunk for Three.js and dependencies
- Route-based chunks for pages
- Dynamic imports for non-critical features
- Lazy loading for project assets

### Caching Strategy
- **Static Assets**: 1 year cache (immutable filenames)
- **3D Assets**: 1 week cache (versioned)
- **API Responses**: 5 minutes cache
- **HTML Documents**: No cache (SSR)

## Monitoring Metrics

### Core Web Vitals
| Metric | Target | Tool |
|--------|--------|------|
| LCP (Largest Contentful Paint) | ≤ 1.5s | Web Vitals |
| FID (First Input Delay) | ≤ 100ms | Web Vitals |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | Web Vitals |

### Custom 3D Metrics
| Metric | Target | Tool |
|--------|------|
| TTI (Time to Interactive) | ≤ 180ms | Custom |
| FPS (Frames Per Second) | ≥ 55 | Three.js Stats |
| Memory Usage | ≤ 90% | Browser APIs |
| Asset Load Time | ≤ 2s | Performance API |

## Failure Scenarios

### Network Failure
- Fallback to static 8K images
- Reduced functionality mode
- Offline support via service worker

### WebGL Failure
- Canvas fallback to static images
- CSS3D fallback for simple animations
- Graceful degradation message

### Device Performance
- Automatic quality reduction
- Frame rate throttling
- Simplified asset loading
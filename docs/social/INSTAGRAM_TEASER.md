# Instagram Vertical Teaser Site

## Overview

A 9:16 vertical teaser site designed for the Instagram bio link to showcase the ATRIA 3D experience and drive traffic to the main website.

## Design Specifications

### Aspect Ratio
- **Primary**: 9:16 (1080×1920 pixels)
- **Alternative**: 4:5 (1080×1350 pixels)
- **Fallback**: 1:1 (1080×1080 pixels)

### Visual Elements
1. **Header**
   - ATRIA logo (top center)
   - "Light Carved in Memory" tagline
   - Subtle platinum accent line

2. **Hero Loop**
   - 4-second looping video of:
     * 3D corridor perspective
     * Liquid monogram formation
     * Porcelain gallery reveal
   - Each clip: 1.33 seconds
   - Seamless transitions

3. **Project Previews**
   - 3 project thumbnails in vertical stack
   - Each with:
     * 3D model preview (static render)
     * Project title (ALL CAPS)
     * Brief descriptor (3 words max)

4. **Call-to-Action**
   - "Experience the Full Portfolio"
   - Platinum button with arrow icon
   - Subtle hover/motion effect

5. **Footer**
   - Social links (Instagram, LinkedIn, Twitter)
   - Copyright information
   - "ATRIA 2025" watermark

## Technical Implementation

### Video Assets
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080×1920 pixels
- **Bitrate**: 5 Mbps
- **Duration**: 4 seconds each
- **Looping**: Seamless with no visible seam

### Lottie Animations
- **Format**: JSON (Lottie)
- **Fallback**: Static PNG for unsupported browsers
- **Size**: ≤ 200 KB each
- **Animations**:
  * Platinum accent line drawing
  * Button hover effect
  * Project preview transitions

### Responsive Design
```css
/* Mobile First */
.teaser-container {
  width: 100vw;
  height: 100vh;
  aspect-ratio: 9/16;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}

/* Desktop */
@media (min-aspect-ratio: 1/1) {
  .teaser-container {
    width: 30vw;
    height: auto;
    max-width: 400px;
  }
}
```

## Content Strategy

### Video Sequence
1. **Clip 1: Gallery Corridor** (1.33s)
   - Camera moves down infinite reflective corridor
   - Project dioramas flickering into view
   - Platinum accent elements catching light

2. **Clip 2: Liquid Monogram** (1.33s)
   - 10,000 glass shards coalescing
   - Formation of "A" monogram
   - Monogram melting into floor

3. **Clip 3: Porcelain Gallery** (1.33s)
   - Gallery lights illuminating space
   - Soft focus on material textures
   - Camera pull-back reveal

### Typography
- **Display**: Canela Text Light (All Caps)
- **Body**: Neue Haas Grotesk 55 Roman
- **Size**: 
  * Logo: 24px
  * Tagline: 16px
  * Project Titles: 20px
  * CTA: 18px
- **Tracking**: 0.025em for all caps

### Color Palette
- **Background**: #0B0B (Obsidian)
- **Text**: #F7F5F2 (Porcelain) at 90% opacity
- **Accent**: #D4D4D4 (Brushed Platinum)
- **CTA Button**: #D4D4D4 text on #0B0B0B background

## User Experience

### Loading States
1. **Initial Load**
   - Platinum loading spinner
   - "Entering ATRIA" text
   - Duration: 0-2 seconds

2. **Content Ready**
   - Fade-in sequence:
     * Logo and tagline (0.5s)
     * Video loop (0.5s)
     * Project previews (0.5s)
     * CTA button (0.5s)

### Interactions
1. **Hover Effects** (Desktop)
   - Platinum glow on CTA button
   - Subtle scale on project previews
   - Cursor change to pointer

2. **Touch Interactions** (Mobile)
   - Tap to visit main site
   - Swipe up/down to preview projects
   - Long press for project details

### Navigation
- **Primary CTA**: "Experience the Full Portfolio" → Main website
- **Secondary Links**: Project previews → Specific project pages
- **Social Links**: Instagram, LinkedIn, Twitter icons

## Performance Targets

### Load Time
- **Target**: ≤ 2 seconds on 4G
- **Assets**: ≤ 2 MB total
- **Critical Path**: ≤ 500 KB

### File Sizes
| Asset | Format | Size |
|-------|--------|------|
| Video Clips (3) | MP4 | 1.2 MB |
| Lottie Animations (3) | JSON | 300 KB |
| Images | WebP | 200 KB |
| CSS | Minified | 15 KB |
| JavaScript | Minified | 35 KB |
| **Total** | | **1.75 MB** |

## Analytics and Tracking

### Events
1. **Page View**
   - Track teaser site visits
   - Device type and screen size
   - Referral source (Instagram)

2. **Interactions**
   - CTA button clicks
   - Project preview taps
   - Video completion rates

3. **Engagement**
   - Time spent on page
   - Scroll depth (if applicable)
   - Exit intent

### Implementation
```javascript
// CTA Click Tracking
document.getElementById('cta-button').addEventListener('click', () => {
  gtag('event', 'teaser_cta_click', {
    event_category: 'engagement',
    event_label: 'Main Website CTA'
  });
});
```

## A/B Testing Plan

### Variants
1. **Control**: Standard teaser with 3 video clips
2. **Variant A**: Single long-form video (4s)
3. **Variant B**: Interactive 3D preview (WebGL)
4. **Variant C**: Static image carousel

### Metrics
- Click-through rate to main site
- Time spent on teaser
- Bounce rate from teaser
- Conversion rate to portfolio views

### Duration
- **Test Period**: 2 weeks
- **Sample Size**: 10,000 visitors
- **Confidence Level**: 95%
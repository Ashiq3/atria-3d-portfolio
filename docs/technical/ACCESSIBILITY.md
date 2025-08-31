# Accessibility Implementation

## Overview

The ATRIA website implements comprehensive accessibility features to ensure all users can experience the luxury 3D portfolio, regardless of abilities or assistive technology usage.

## WCAG 2.2 AA Compliance

### Perceivable
- **Text Alternatives**: Alt-3D JSON descriptors for all non-text content
- **Time-based Media**: Captions and audio descriptions for video content
- **Adaptable**: Content can be presented in different ways
- **Distinguishable**: Content is easy to see and hear

### Operable
- **Keyboard Accessible**: Full functionality available via keyboard
- **Enough Time**: Users have enough time to read and use content
- **Seizures and Physical Reactions**: No content that causes seizures
- **Navigable**: Provide ways to help users navigate
- **Input Modalities**: Make it easier for users to operate functionality through various inputs

### Understandable
- **Readable**: Make text content readable and understandable
- **Predictable**: Make web pages appear and operate in predictable ways
- **Input Assistance**: Help users avoid and correct mistakes

### Robust
- **Compatible**: Maximize compatibility with current and future user tools

## Screen Reader Support

### Alt-3D Descriptors
```json
{
  "scene": "liquid-glass-atrium",
  "frame": 6,
  "description": "Liquid metal forming the letter A in a dark space. The metal flows like liquid mercury, gradually taking the shape of a stylized monogram.",
  "elements": [
    {
      "type": "3d-object",
      "name": "liquid-metal-monogram",
      "description": "Stylized letter A formed from flowing liquid metal",
      "material": "liquid-metal",
      "position": "center"
    }
  ],
  "actions": [
    {
      "type": "scroll",
      "direction": "down",
      "effect": "monogram will begin to melt and form into a floor"
    }
  ]
}
```

### Focus Management
- **Invisible Focus Planes**: Transparent div elements that receive keyboard focus
- **Spatial Navigation**: Logical tab order through 3D scenes
- **Skip Links**: "Skip to main content" and "skip to projects" links

### ARIA Implementation
```html
<!-- Hero Scene Container -->
<div 
  id="hero-scene"
  role="region"
  aria-label="Interactive 3D hero animation"
  aria-describedby="hero-description"
  tabindex="-1">
  
  <!-- Canvas for 3D rendering -->
  <canvas 
    id="threejs-canvas"
    role="img"
    aria-label="3D visualization of liquid glass atrium">
  </canvas>
  
  <!-- Screen reader description -->
  <div id="hero-description" class="sr-only">
    <!-- Dynamically updated based on current frame -->
  </div>
</div>
```

## Keyboard Navigation

### Navigation Planes
```
┌─────────────────────────────┐
│              Navigation Planes              │
├─────────────────────────────────────────────┤
│  [1] Header Navigation                      │
│        Logo, Menu, Social Links             │
├─────────────────────────────────────────────┤
│  [2] Hero Scene Controls                    │
│        Play/Pause, Frame Navigation         │
├─────────────────────────────────────────────┤
│  [3] Project Gallery                        │
│        Project 1, Project 2, ..., Project 6 │
├─────────────────────────────────────────────┤
│  [4] Project Detail View                    │
│        3D Model, Description, Next/Prev     │
├─────────────────────────────────────────────┤
│  [5] Footer                                 │
│        Contact, Legal, Copyright            │
└─────────────────────────────────────┘
```

### Keyboard Shortcuts
| Key | Function |
|-----|----------|
| Tab | Move to next focusable element |
| Shift+Tab | Move to previous focusable element |
| Enter/Space | Activate current element |
| Arrow Keys | Navigate within components |
| Escape | Close modals or overlays |
| 1-6 | Direct access to projects |

## Reduced Motion Support

### Detection
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations
  document.body.classList.add('reduced-motion');
}
```

### Alternative Experience
- **Static Hero**: High-resolution 8K still of final gallery scene
- **Fade Transitions**: Simple opacity transitions instead of 3D animations
- **Static Gallery**: Non-interactive project images with standard navigation

### User Controls
```html
<!-- Motion Control Toggle -->
<button 
  id="motion-toggle"
  role="switch"
  aria-checked="false"
  aria-label="Toggle motion effects">
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
</button>
```

## Color Contrast

### Contrast Ratios
| Element | Text Color | Background | Contrast Ratio | WCAG Level |
|---------|------------|------------|----------------|------------|
| Body Text | #F7F5F2 | #0B0B | 15.2:1 | AAA |
| Headings | #F7F5F2 | #0B0B0B | 15.2:1 | AAA |
| Links | #D4D4D4 | #0B0B0B | 12.8:1 | AAA |
| Buttons | #0B0B0B | #D4D4D4 | 12.8:1 | AAA |

### Focus Indicators
- **Color**: #D4D4D4 (Brushed Platinum)
- **Style**: 3px solid outline
- **Offset**: 2px from element
- **Contrast**: 4.5:1 against all backgrounds

## Text Scaling

### Responsive Typography
- **Minimum**: 16px base font size
- **Maximum**: 24px base font size
- **Scaling**: Fluid scaling between 320px and 2560px viewport
- **Line Height**: 1.5 for body text, 1.2 for headings

### Zoom Support
- **Text Zoom**: Up to 200% without loss of functionality
- **Page Zoom**: Up to 400% with reflow
- **Pinch Zoom**: Mobile touch zoom support

## High Contrast Mode

### Windows High Contrast
- **Detection**: CSS media query for forced colors
- **Adaptation**: System color palette mapping
- **Preservation**: Essential visual information maintained

### Custom High Contrast
```css
@media (prefers-contrast: high) {
  :root {
    --text-primary: #FFFFFF;
    --text-secondary: #CCCCCC;
    --background-primary: #000000;
    --background-secondary: #333333;
    --accent: #FFFF00;
  }
}
```

## Cognitive Accessibility

### Simplified Navigation
- **Consistent Layout**: Persistent navigation across all pages
- **Clear Labels**: Descriptive link and button text
- **Error Prevention**: Confirmation for destructive actions
- **Error Recovery**: Clear error messages with recovery steps

### Content Organization
- **Headings Hierarchy**: Proper H1-H6 structure
- **Section Landmarks**: ARIA landmarks for major content areas
- **List Structure**: Proper UL/OL for related items
- **Link Purpose**: Clear link text out of context

## Testing Strategy

### Automated Testing
- **axe-core**: Integration with build process
- **Lighthouse**: Regular accessibility audits
- **Pa11y**: Continuous integration checks

### Manual Testing
- **Screen Readers**: NVDA, JAWS, VoiceOver
- **Keyboard Navigation**: Full site navigation without mouse
- **Zoom Testing**: 200% zoom on all pages
- **High Contrast**: Windows High Contrast Mode

### User Testing
- **Assistive Technology Users**: Regular feedback sessions
- **Accessibility Experts**: Quarterly audits
- **Diverse Users**: Testing with various abilities and disabilities

## Documentation

### Accessibility Statement
A public accessibility statement will be available explaining:
- Our commitment to accessibility
- Compliance standards (WCAG 2.2 AA)
- Contact information for accessibility issues
- Known limitations and workarounds

### Developer Guidelines
Internal documentation for maintaining accessibility:
- Component accessibility requirements
- Testing procedures
- Common pitfalls and solutions
- Code examples and best practices
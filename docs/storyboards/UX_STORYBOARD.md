# UX Storyboard

## 12-Frame 3D Scroll Experience

### Frame 1: Initial Load
- **Viewport**: Fullscreen black (#0B0B0B)
- **Element**: Obsidian prism centered in viewport
- **Camera**: Static, orthographic view
- **Animation**: None
- **Interaction**: None

### Frame 2: Fracture Initiation
- **Viewport**: Fullscreen black
- **Element**: Obsidian prism with initial crack formation
- **Camera**: Static
- **Animation**: Subtle vibration effect (100ms)
- **Interaction**: Auto-progress

### Frame 3: Shattering
- **Viewport**: Fullscreen black
- **Element**: 10,000 glass shards exploding outward
- **Camera**: Static
- **Animation**: Explosion physics (300ms)
- **Interaction**: Scroll delta controls speed

### Frame 4: Orbit Formation
- **Viewport**: Fullscreen black
- **Element**: Glass shards orbiting central point
- **Camera**: Static
- **Animation**: Orbital mechanics (400ms)
- **Interaction**: Scroll delta controls rotation speed

### Frame 5: Coalescence Start
- **Viewport**: Fullscreen black
- **Element**: Shards beginning to merge
- **Camera**: Static
- **Animation**: Inward spiral motion (300ms)
- **Interaction**: Scroll delta controls merge speed

### Frame 6: Monogram Formation
- **Viewport**: Fullscreen black
- **Element**: "A" monogram taking shape
- **Camera**: Static
- **Animation**: Liquid metal flow effect (400ms)
- **Interaction**: Scroll delta controls formation

### Frame 7: Monogram Refinement
- **Viewport**: Fullscreen black
- **Element**: Polished "A" monogram
- **Camera**: Static
- **Animation**: Surface smoothing (200ms)
- **Interaction**: Scroll delta controls polish speed

### Frame 8: Melting Transition
- **Viewport**: Fullscreen black
- **Element**: Monogram beginning to melt
- **Camera**: Static
- **Animation**: Liquid physics (300ms)
- **Interaction**: Scroll delta controls melt speed

### Frame 9: Floor Formation
- **Viewport**: Top half black, bottom half reflective
- **Element**: Liquid metal forming floor
- **Camera**: Beginning tilt down
- **Animation**: Flow and settle (400ms)
- **Interaction**: Scroll delta controls camera tilt

### Frame 10: Gallery Reveal
- **Viewport**: 70% black, 30% reflective gallery
- **Element**: First glimpse of gallery corridor
- **Camera**: Continuing tilt down
- **Animation**: Gallery lights flickering on (200ms)
- **Interaction**: Scroll delta controls camera movement

### Frame 11: Project Dioramas
- **Viewport**: 50% black, 50% gallery
- **Element**: First 2 project dioramas visible
- **Camera**: Full tilt down position
- **Animation**: Dioramas materializing (300ms)
- **Interaction**: Scroll delta controls diorama detail

### Frame 12: Full Gallery
- **Viewport**: 20% black, 80% gallery
- **Element**: Complete gallery corridor with all 6 dioramas
- **Camera**: Final position looking down corridor
- **Animation**: Infinite corridor effect
- **Interaction**: Free scroll through projects

## Micro-Interactions

### Magnet Cursor
- **Trigger**: Mouse movement within 50px of interactive element
- **Effect**: Platinum halo expands around cursor
- **Duration**: 150ms ease-in-out

### Glass-Morph Hover
- **Trigger**: Hover over project diorama
- **Effect**: 32px blur radius applied to background
- **Duration**: 250ms ease-out

### Inertia Scroll
- **Trigger**: Scroll wheel or touch drag
- **Effect**: 1.8× multiplier to scroll distance
- **Duration**: 600ms with cubic-bezier(0.25, 0.1, 0.25, 1)

### Sound Feedback
- **Trigger**: Transition between major frames
- **Effect**: 120ms crystalline ping
- **Volume**: 20% (user adjustable)

## Accessibility States

### Reduced Motion
- **Alternative**: Static 8K still of Frame 12
- **Transition**: 500ms fade-in
- **Navigation**: Arrow buttons for project browsing

### Screen Reader
- **Alternative**: Alt-3D JSON descriptions for each frame
- **Navigation**: Keyboard tabbing through focus planes
- **Feedback**: Audio descriptions of visual elements

## Mobile Adaptations

### Touch Gestures
- **Swipe**: Horizontal swipe to navigate projects
- **Pinch**: Zoom in/out on 3D models
- **Double Tap**: Reset view

### Performance Fallback
- **Quality**: Reduced polygon count (50%)
- **Textures**: Lower resolution (512px instead of 2048px)
- **Effects**: Disabled bloom and reflections
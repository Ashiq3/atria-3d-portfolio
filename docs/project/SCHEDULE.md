# Production Schedule

## 12-Week Sprint Timeline

```mermaid
gantt
    title ATRIA 3D Portfolio Website Production Schedule
    dateFormat  YYYY-MM-DD
    section Planning & Setup
    Creative Lock           :done, des1, 2025-09-01, 7d
    8K Shoots & LiDAR Scan  :active, 2025-09-08, 14d
    section Asset Production
    3D Asset Production     :2025-09-22, 14d
    Asset Optimization      :2025-10-06, 7d
    section Frontend Development
    Hero Scene Build        :2025-10-13, 14d
    Case Studies (3)        :2025-10-27, 14d
    section QA & Polish
    Accessibility Audit     :2025-11-10, 7d
    Performance Optimization :2025-11-17, 7d
    section Launch Preparation
    Soft Preview            :2025-11-24, 7d
    Final Case Studies (3)  :2025-12-01, 14d
    section Launch
    NFT Minting             :2025-12-15, 7d
    Social Teaser Drop      :2025-12-22, 7d
    Public Launch           :milestone, 2025-12-29, 0d

    style des1 fill:#0B0B0B,stroke:#D4D4D4
```

## Week-by-Week Breakdown

### Week 1: Creative Lock (Sep 1 - Sep 7)
- **Deliverables**:
  * Finalized creative brief
  * Mood boards approval
  * Technical architecture sign-off
  * GitHub repository initialized
- **Team**:
  * Creative Director
  * Technical Lead
  * Project Manager
- **Dependencies**: Client approval on executive decisions

### Week 2-3: 8K Shoots & LiDAR Scan (Sep 8 - Sep 21)
- **Deliverables**:
  * 100 MP RAW stills for 6 projects
  * LiDAR scan data for photogrammetry
  * On-site 3D scanning of key elements
- **Team**:
  * Photography Director
  * 3D Scanning Specialist
  * Production Assistant
- **Dependencies**: Weather, location access, equipment availability

### Week 4-5: 3D Asset Production (Sep 22 - Oct 5)
- **Deliverables**:
  * 6 project diorama models
  * Hero scene assets (prism, monogram, corridor)
  * UI component 3D elements
  * Textures and materials
- **Team**:
  * 3D Artists (3)
  * Texturing Artist
  * Technical Artist
- **Dependencies**: Approved reference materials, completed scans

### Week 6: Asset Optimization (Oct 6 - Oct 12)
- **Deliverables**:
  * Draco-compressed models
  * KTX2 compressed textures
  * LOD versions for performance
  * Asset size reports
- **Team**:
  * Technical Artist
  * Optimization Specialist
- **Dependencies**: Completed 3D assets

### Week 7-8: Hero Scene Build (Oct 13 - Oct 26)
- **Deliverables**:
  * Liquid-glass atrium animation
  * Scroll-based interaction system
  * Performance optimization
  * Cross-browser testing
- **Team**:
  * Frontend Developer (3D)
  * UI Developer
  * QA Engineer
- **Dependencies**: Optimized hero assets

### Week 9: Case Studies (3) (Oct 27 - Nov 9)
- **Deliverables**:
  * 3 interactive project showcases
  * Cinemagraph integration
  * Project information panels
  * Navigation between projects
- **Team**:
  * Frontend Developer (3D)
  * UI Developer
  * Content Specialist
- **Dependencies**: Optimized project assets

### Week 10: Accessibility Audit (Nov 10 - Nov 16)
- **Deliverables**:
  * Screen reader compatibility
 * Keyboard navigation
  * Reduced motion alternatives
  * Accessibility report
- **Team**:
  * Accessibility Specialist
  * QA Engineer
  * Frontend Developer
- **Dependencies**: Functional website build

### Week 11: Performance Optimization (Nov 17 - Nov 23)
- **Deliverables**:
  * Load time ≤ 1.5 seconds
  * Frame rate ≥ 55 FPS on target devices
  * Memory usage ≤ 90%
  * Performance report
- **Team**:
  * Performance Specialist
  * Frontend Developer
  * QA Engineer
- **Dependencies**: Completed accessibility fixes

### Week 12: Soft Preview (Nov 24 - Nov 30)
- **Deliverables**:
  * Password-protected preview site
  * Client feedback integration
  * Bug fixes and polish
  * Final approval
- **Team**:
  * Project Manager
  * Frontend Developer
  * QA Engineer
  * Client Representative
- **Dependencies**: Completed website build

### Week 13-14: Final Case Studies (3) (Dec 1 - Dec 14)
- **Deliverables**:
  * Remaining 3 project showcases
  * Consistent styling with first 3
  * Performance optimization
  * Final testing
- **Team**:
  * Frontend Developer (3D)
  * UI Developer
  * QA Engineer
- **Dependencies**: Approved first 3 case studies

### Week 15: NFT Minting (Dec 15 - Dec 21)
- **Deliverables**:
  * Deployed smart contract
  * Minted ATRIA GENESIS token
  * Verified on Etherscan
  * Certificate integration on website
- **Team**:
  * Blockchain Developer
  * Smart Contract Auditor
  * Project Manager
- **Dependencies**: Final website build and hash

### Week 16: Social Teaser Drop (Dec 22 - Dec 28)
- **Deliverables**:
  * Instagram teaser site
  * Social media assets
  * Marketing announcement
  * Analytics setup
- **Team**:
  * Marketing Specialist
  * UI Developer
  * Social Media Manager
- **Dependencies**: NFT certificate ready

### Week 17: Public Launch (Dec 29)
- **Deliverables**:
  * Public website launch
  * Press release distribution
  * Community announcement
  * Post-launch monitoring
- **Team**:
  * Project Manager
  * DevOps Engineer
  * Marketing Team
  * Support Team
- **Dependencies**: All previous milestones completed

## Risk Management

### Critical Path Risks
1. **3D Asset Production Delays**
   - **Mitigation**: Buffer week built into schedule
   - **Contingency**: Simplified assets for fallback

2. **Performance Targets Not Met**
   - **Mitigation**: Weekly performance testing
   - **Contingency**: Quality settings reduction

3. **NFT Smart Contract Issues**
   - **Mitigation**: Thorough testing on testnet
   - **Contingency**: Extended minting timeline

### Resource Dependencies
- **Photography Team**: Booked for weeks 2-3
- **3D Artists**: Dedicated to asset production
- **Blockchain Developer**: Available for NFT implementation
- **QA Team**: Allocated for testing phases

## Communication Plan

### Weekly Check-ins
- **Participants**: Core team leads
- **Agenda**: Progress update, blockers, next week priorities
- **Output**: Weekly status report

### Bi-weekly Client Reviews
- **Participants**: Client stakeholders, project team
- **Agenda**: Demo of completed work, feedback integration
- **Output**: Approved deliverables, updated timeline

### Daily Standups (As Needed)
- **Participants**: Active project team
- **Agenda**: Daily progress, immediate blockers
- **Output**: Task updates, quick decisions

## Success Metrics

### Quality Metrics
- **Visual Fidelity**: Client approval on all creative deliverables
- **Performance**: Meet all budget targets
- **Accessibility**: WCAG 2.2 AA compliance
- **Cross-browser**: 100% functionality on target browsers

### Timeline Metrics
- **Milestone Adherence**: ≥ 90% on-time delivery
- **Budget Management**: Within 5% of allocated budget
- **Scope Control**: Minimal change requests

### Client Satisfaction
- **Feedback Score**: ≥ 4.5/5 on all deliverables
- **Communication**: Weekly satisfaction surveys
- **Final Delivery**: Sign-off on all project components
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

To set up the GitHub repository, you have two options:

### Option 1: Automated Setup (Requires GitHub CLI)

If you have GitHub CLI installed, you can use the provided scripts:

#### Windows:
```bash
scripts\setup-github.bat
```

#### macOS/Linux:
```bash
chmod +x scripts/setup-github.sh
./scripts/setup-github.sh
```

### Option 2: Manual Setup

If GitHub CLI is not available, follow the detailed manual setup instructions in `docs/project/GITHUB_MANUAL_SETUP.md`:

1. Create a new private repository named "atria-3d-portfolio" on GitHub
2. Add the remote origin:
   ```bash
   git remote add origin https://github.com/your-username/atria-3d-portfolio.git
   ```
3. Push the code:
   ```bash
   git push -u origin main
   ```

## Post-Setup Configuration

After setting up the repository, you need to configure the following through the GitHub web interface:

1. Branch protection rules for the main branch
2. Repository secrets for AWS deployment
3. GitHub project board for task tracking
4. Team member access permissions

For detailed instructions on these steps, see `docs/project/GITHUB_MANUAL_SETUP.md`.

## Repository Status

The local repository is fully configured and ready to be pushed to GitHub. All necessary workflows, documentation, and scripts have been created. The repository needs to be created on GitHub and the local code needs to be pushed. The remaining tasks require manual intervention through the GitHub web interface.
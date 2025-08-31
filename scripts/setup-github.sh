#!/bin/bash

# Script to set up GitHub repository for ATRIA 3D Portfolio

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI (gh) is not installed. Please install it first:"
    echo "Visit: https://cli.github.com/"
    exit 1
fi

# Login to GitHub CLI
echo "Please login to GitHub CLI:"
gh auth login

# Create private repository
echo "Creating private repository 'atria-3d-portfolio'..."
gh repo create atria-3d-portfolio --private --clone

# Add remote origin (if not cloned)
if [ ! -d "atria-3d-portfolio" ]; then
    git remote add origin git@github.com:$(gh api user | jq -r '.login')/atria-3d-portfolio.git
fi

# Push code to GitHub
echo "Pushing code to GitHub..."
git push -u origin main

# Set up branch protection rules
echo "Setting up branch protection rules..."
gh api \
  --method PUT \
  -H "Accept: application/vnd.github.v3+json" \
  /repos/$(gh api user | jq -r '.login')/atria-3d-portfolio/branches/main/protection \
  -f required_status_checks=null \
  -f enforce_admins=true \
  -f required_pull_request_reviews=null \
  -f restrictions=null

echo "GitHub repository setup complete!"
echo "Next steps:"
echo "1. Set up repository secrets in GitHub Settings > Secrets and variables > Actions"
echo "2. Configure AWS credentials for deployment"
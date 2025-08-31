# GitHub Manual Setup Instructions

This document provides step-by-step instructions for manually setting up the GitHub repository for the ATRIA 3D Portfolio website. These steps need to be performed manually through the GitHub web interface since the GitHub CLI is not available.

## Prerequisites

1. A GitHub account
2. Repository owner permissions
3. Git installed and configured on your local machine

## Steps to Complete

### 1. Create Private Repository on GitHub

1. Log in to your GitHub account
2. Go to https://github.com/new
3. Enter the following details:
   - Repository name: `atria-3d-portfolio`
   - Description: ATRIA 3D Portfolio Website - An immersive 3D portfolio showcasing creative works using WebGPU and Three.js
   - Visibility: Private
4. **Do NOT initialize the repository with a README, .gitignore, or license** (we already have these locally)
5. Click "Create repository"

### 2. Add Remote Origin to Local Repository

After creating the repository, you'll need to add it as a remote to your local repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/atria-3d-portfolio.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

To verify the remote was added correctly:
```bash
git remote -v
```

### 3. Push Code to GitHub

Push the local code to the newly created repository:

```bash
git push -u origin main
```

Note: The local branch is named "main". If for some reason your local branch is still named "master", you can either:
1. Rename it locally first: `git branch -m master main`
2. Or push to master: `git push -u origin master`

### 4. Set Up Branch Protection Rules

1. Go to your repository Settings
2. Click on "Branches" in the left sidebar
3. Under "Branch protection rules", click "Add rule"
4. Set the branch name pattern to "main"
5. Enable the following options:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Include administrators (optional but recommended)
6. Click "Create"

### 5. Set Up Repository Secrets

1. Go to your repository Settings
2. Click on "Secrets and variables" > "Actions" in the left sidebar
3. Click "New repository secret"
4. Add the following secrets for AWS deployment:
   - Name: `AWS_ACCESS_KEY_ID`, Value: Your AWS access key ID
   - Name: `AWS_SECRET_ACCESS_KEY`, Value: Your AWS secret access key
   - Name: `S3_BUCKET_NAME`, Value: Your S3 bucket name
   - Name: `CLOUDFRONT_DISTRIBUTION_ID`, Value: Your CloudFront distribution ID

### 6. Create Project Board

1. Go to the "Projects" tab in your repository
2. Click "New project"
3. Select the "Basic kanban" template
4. Name the project "ATRIA 3D Portfolio"
5. Click "Create project"
6. Ensure the board has the following columns:
   - Backlog
   - Todo
   - In Progress
   - Review
   - Done
7. Customize the columns as needed

### 7. Add Team Members

1. Go to your repository Settings
2. Click on "Collaborators and teams" in the left sidebar
3. Click "Add people"
4. Enter the GitHub usernames or email addresses of team members
5. Select appropriate permissions:
   - For developers: "Write" or "Maintain"
   - For project managers: "Maintain" or "Admin"
   - For stakeholders: "Read"

## Verification

After completing all steps, verify that:

1. Code is pushed to the GitHub repository
2. Branch protection rules are active
3. Repository secrets are configured
4. Project board is created with the required columns
5. Team members have appropriate access

## Next Steps

1. Configure any additional GitHub Actions workflows
2. Set up automated deployments
3. Configure webhooks for notifications
4. Review and adjust repository settings as needed

## Troubleshooting

### Common Issues and Solutions

1. **"Permission denied" when pushing code**
   - Ensure you're using the correct credentials
   - Try using SSH instead of HTTPS: `git remote set-url origin git@github.com:YOUR_USERNAME/atria-3d-portfolio.git`

2. **Branch protection rules not working**
   - Make sure you're targeting the correct branch name ("main")
   - Verify that required status checks are properly configured in your GitHub Actions workflow

3. **Repository secrets not accessible in workflows**
   - Ensure secrets are named exactly as referenced in the workflow files
   - Check that the workflow has the correct permissions to access secrets

## Additional Resources

- [GitHub Documentation](https://docs.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Repository Security Best Practices](https://docs.github.com/en/code-security)
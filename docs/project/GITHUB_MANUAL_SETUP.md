# GitHub Manual Setup Instructions

This document provides step-by-step instructions for manually setting up the GitHub repository for the ATRIA 3D Portfolio website. These steps need to be performed manually through the GitHub web interface since the GitHub CLI is not available.

## Prerequisites

1. A GitHub account
2. Repository owner permissions

## Steps to Complete

### 1. Create Private Repository on GitHub

1. Log in to your GitHub account
2. Go to https://github.com/new
3. Enter the following details:
   - Repository name: `atria-3d-portfolio`
   - Description: ATRIA 3D Portfolio Website
   - Visibility: Private
4. Click "Create repository"

### 2. Add Remote Origin to Local Repository

After creating the repository, you'll need to add it as a remote to your local repository:

```bash
git remote add origin https://github.com/YOUR_USERNAME/atria-3d-portfolio.git
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Push Code to GitHub

Push the local code to the newly created repository:

```bash
git push -u origin master
```

Note: The local branch is named "master". Consider renaming it to "main" for consistency with modern GitHub conventions.

### 4. Rename Branch to "main" (Recommended)

To follow modern GitHub conventions, rename the branch from "master" to "main":

1. On GitHub, go to your repository
2. Click on the "master" branch dropdown
3. Type "main" and select "Create branch: main from 'master'"
4. Go to Settings > Branches
5. Change the default branch to "main"
6. Delete the "master" branch

### 5. Set Up Branch Protection Rules

1. Go to your repository Settings
2. Click on "Branches" in the left sidebar
3. Under "Branch protection rules", click "Add rule"
4. Set the branch name pattern to "main"
5. Enable the following options:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Include administrators (optional but recommended)
6. Click "Create"

### 6. Set Up Repository Secrets

1. Go to your repository Settings
2. Click on "Secrets and variables" > "Actions" in the left sidebar
3. Click "New repository secret"
4. Add the following secrets for AWS deployment:
   - Name: `AWS_ACCESS_KEY_ID`, Value: Your AWS access key ID
   - Name: `AWS_SECRET_ACCESS_KEY`, Value: Your AWS secret access key
   - Name: `S3_BUCKET_NAME`, Value: Your S3 bucket name
   - Name: `CLOUDFRONT_DISTRIBUTION_ID`, Value: Your CloudFront distribution ID

### 7. Create Project Board

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

### 8. Add Team Members

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
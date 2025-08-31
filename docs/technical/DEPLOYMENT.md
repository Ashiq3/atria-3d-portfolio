# Deployment Instructions

This document provides instructions for deploying the ATRIA 3D Portfolio website to GitHub and AWS.

## GitHub Repository Setup

1. Create a new private repository named "atria-3d-portfolio" on GitHub
2. Add the remote origin to your local repository:
   ```bash
   git remote add origin https://github.com/your-username/atria-3d-portfolio.git
   ```
3. Push the code to GitHub:
   ```bash
   git push -u origin main
   ```

## GitHub Branch Protection Rules

Set up branch protection rules for the main branch:
1. Go to Settings > Branches
2. Add rule for "main" branch with the following settings:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Include administrators

## GitHub Actions Secrets

Set up the following secrets in GitHub repository settings:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET_NAME
- CLOUDFRONT_DISTRIBUTION_ID

## AWS Infrastructure Setup

1. Create an S3 bucket with Intelligent-Tiering
2. Set up CloudFront distribution
3. Configure Route 53 DNS
4. Set up SSL certificate with ACM
5. Configure Lambda@Edge functions for performance optimization

## CI/CD Pipeline

The CI/CD pipeline is configured in `.github/workflows/ci-cd.yml` and includes:
- Automated testing on multiple Node.js versions
- Build validation
- Deployment to AWS S3
- CloudFront invalidation

## Monitoring and Alerting

Set up monitoring with:
- AWS CloudWatch for infrastructure monitoring
- Custom performance metrics tracking
- Error tracking and alerting
- Uptime monitoring
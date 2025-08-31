# Setting up Repository Secrets for AWS Deployment

This document provides instructions for setting up the required repository secrets for AWS deployment of the ATRIA 3D Portfolio website.

## Required Secrets

The following secrets need to be configured in your GitHub repository:

1. `AWS_ACCESS_KEY_ID` - Your AWS access key ID
2. `AWS_SECRET_ACCESS_KEY` - Your AWS secret access key
3. `S3_BUCKET_NAME` - Your S3 bucket name for hosting
4. `CLOUDFRONT_DISTRIBUTION_ID` - Your CloudFront distribution ID

## How to Set Up Secrets

### Option 1: Using GitHub CLI (Recommended)

Run the following commands in your terminal, replacing the placeholder values with your actual AWS credentials:

```bash
gh secret set AWS_ACCESS_KEY_ID --body "your-aws-access-key-id"
gh secret set AWS_SECRET_ACCESS_KEY --body "your-aws-secret-access-key"
gh secret set S3_BUCKET_NAME --body "your-s3-bucket-name"
gh secret set CLOUDFRONT_DISTRIBUTION_ID --body "your-cloudfront-distribution-id"
```

### Option 2: Using GitHub Web Interface

1. Go to your repository on GitHub: https://github.com/Ashiq3/atria-3d-portfolio
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each of the required secrets listed above

## Security Best Practices

- Never commit AWS credentials directly to the repository
- Use IAM users with minimal required permissions
- Rotate credentials regularly
- Monitor AWS usage and set up billing alerts

## Next Steps

After setting up the secrets, the GitHub Actions workflows will be able to deploy the website to AWS automatically.
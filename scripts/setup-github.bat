@echo off
REM Script to set up GitHub repository for ATRIA 3D Portfolio

echo Checking if GitHub CLI is installed...
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo GitHub CLI (gh) is not installed. Please install it first:
    echo Visit: https://cli.github.com/
    pause
    exit /b 1
)

echo Please login to GitHub CLI:
gh auth login

echo Creating private repository 'atria-3d-portfolio'...
gh repo create atria-3d-portfolio --private --clone

REM Add remote origin (if not cloned)
if not exist "atria-3d-portfolio" (
    for /f "delims=" %%i in ('gh api user ^| jq -r ".login"') do set USERNAME=%%i
    git remote add origin git@github.com:%USERNAME%/atria-3d-portfolio.git
)

echo Pushing code to GitHub...
git push -u origin main

echo Setting up branch protection rules...
gh api ^
  --method PUT ^
  -H "Accept: application/vnd.github.v3+json" ^
  /repos/%USERNAME%/atria-3d-portfolio/branches/main/protection ^
  -f required_status_checks=null ^
  -f enforce_admins=true ^
  -f required_pull_request_reviews=null ^
  -f restrictions=null

echo GitHub repository setup complete!
echo Next steps:
echo 1. Set up repository secrets in GitHub Settings ^> Secrets and variables ^> Actions
echo 2. Configure AWS credentials for deployment
pause
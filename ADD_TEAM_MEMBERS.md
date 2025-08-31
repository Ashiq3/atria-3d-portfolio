# Adding Team Members to ATRIA 3D Portfolio Repository

This document provides instructions for adding team members to the ATRIA 3D Portfolio GitHub repository with appropriate permissions.

## Steps to Add Team Members

1. Go to your repository on GitHub: https://github.com/Ashiq3/atria-3d-portfolio
2. Click on "Settings" tab
3. In the left sidebar, click "Collaborators and teams"
4. Click "Add people" button
5. Enter the GitHub username or email address of the person you want to invite
6. Select appropriate permissions:
   - **Read** - Can view repository details and pull requests
   - **Triage** - Can view repository details, pull requests, and manage issues
   - **Write** - Can view repository details, pull requests, and push changes
   - **Maintain** - Can view repository details, pull requests, and manage repository settings
   - **Admin** - Full access to the repository, including deletion

## Recommended Permission Levels

For the ATRIA 3D Portfolio project, we recommend the following permission levels:

1. **Developers** - "Write" or "Maintain" permissions
   - Can contribute code and create pull requests
   - Can review and merge pull requests (if "Maintain")

2. **Project Managers** - "Maintain" or "Admin" permissions
   - Can manage repository settings
   - Can add/remove collaborators
   - Can configure GitHub Actions and other integrations

3. **Stakeholders** - "Read" permissions
   - Can view code and project progress
   - Can comment on issues and pull requests

## Adding Team Members via GitHub CLI (Alternative)

If you have the appropriate permissions, you can also add team members using GitHub CLI:

```bash
# Add a collaborator with specific permissions
gh api repos/Ashiq3/atria-3d-portfolio/collaborators/USERNAME --method PUT -f permission="write"

# Available permission levels: read, triage, write, maintain, admin
```

## Managing Team Access

For organizations with multiple teams, you can also create teams and assign them to the repository:

1. Go to your organization settings (if applicable)
2. Create teams with specific roles
3. Assign team members to appropriate teams
4. Add teams to the repository with specific permissions

## Next Steps

After adding team members, verify that they have received the invitation and can access the repository with their assigned permissions.
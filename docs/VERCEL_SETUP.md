# Vercel Deployment Setup

This guide walks you through setting up automated Vercel deployments for this project.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel

## Overview

This setup creates **two separate Vercel projects** (staging and production) that deploy from the same GitHub repository. When you push a version tag, both environments deploy sequentially, with production requiring approval.

## Step 1: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it: `GitHub Actions Deploy`
4. Scope: **Full Account**
5. Expiration: Choose based on your preference
6. Click **"Create"**
7. **Copy the token** (you won't see it again!)

## Step 2: Get Organization ID

```bash
# Install Vercel CLI locally
npm install -g vercel

# Login to Vercel
vercel login

# Link your project (run in project root)
vercel link

# This creates .vercel/project.json with your IDs
```

After running `vercel link`, check `.vercel/project.json`:

```json
{
  "orgId": "team_xxxxxxxxxxxxx", // This is your VERCEL_ORG_ID
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

Or get it from any Vercel project's settings page:

- Go to: `https://vercel.com/<team-name>/<any-project>/settings`
- The Organization ID is visible in the settings or URL

## Step 3: Set Up Staging and Production Projects

For proper environment separation, create **two separate Vercel projects**:

### Create Staging Project

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. **Project Name**: `<your-project>-staging`
4. **Framework Preset**: Other
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist/demo/browser`
7. Click **"Deploy"**
8. **Save the Project ID** from Settings → General

### Create Production Project

1. Go to https://vercel.com/new again
2. Import the **same GitHub repository**
3. **Project Name**: `<your-project>-prod`
4. Use the same build settings as staging
5. Click **"Deploy"**
6. **Save the Project ID** from Settings → General

> **Note**: Both projects share the same `VERCEL_ORG_ID` but have different `VERCEL_PROJECT_ID` values.

## Step 4: Configure GitHub Secrets

### Repository-Level Secrets (Shared)

Go to: **Settings → Secrets and variables → Actions → New repository secret**

Add these **two shared secrets**:

| Secret Name     | Value                                       |
| --------------- | ------------------------------------------- |
| `VERCEL_TOKEN`  | Your Vercel token from Step 2               |
| `VERCEL_ORG_ID` | Your organization ID (team_xxx or user_xxx) |

### Environment-Specific Secrets

Go to: **Settings → Environments**

#### Configure `staging` Environment

1. Click **"New environment"** or select existing `staging`
2. Add environment secret:
   - **Name**: `VERCEL_PROJECT_ID`
   - **Value**: Your **staging** project ID (from Step 3)
3. (Optional) Add protection rules:
   - Wait timer: 0 minutes
   - Required reviewers: none (for fast iteration)

#### Configure `production` Environment

1. Click **"New environment"** or select existing `production`
2. Add environment secret:
   - **Name**: `VERCEL_PROJECT_ID`
   - **Value**: Your **production** project ID (from Step 3)
3. **Add protection rules** (recommended):
   - ✅ **Required reviewers**: Select team members
   - ✅ **Wait timer**: 5-10 minutes (allows time to cancel)
   - ✅ **Deployment branches**: Only `main` or tags

### Summary of Secrets

| Location                  | Secret Name         | Value                  |
| ------------------------- | ------------------- | ---------------------- |
| Repository (shared)       | `VERCEL_TOKEN`      | Your Vercel auth token |
| Repository (shared)       | `VERCEL_ORG_ID`     | team_xxx or user_xxx   |
| Environment: `staging`    | `VERCEL_PROJECT_ID` | Staging project ID     |
| Environment: `production` | `VERCEL_PROJECT_ID` | Production project ID  |

## Step 5: Test Deployment

### Manual Test

```bash
# Create a test tag
git tag v0.1.1-test
git push origin v0.1.1-test
```

Watch the deployment at:

- GitHub Actions: `https://github.com/<user>/<repo>/actions`
- Vercel Dashboard: `https://vercel.com/dashboard`

### Automated Release

```bash
# From main branch
npm run release:tag
```

This will:

1. ✅ Bump version in package.json
2. ✅ Create git tag
3. ✅ Push to GitHub
4. ✅ Trigger deployment workflow
5. ✅ Deploy to Vercel
6. ✅ Create GitHub release

## Vercel Configuration

The `vercel.json` file configures:

- **Build settings**: Output directory, build command
- **Routing**: SPA routing (all routes → index.html)
- **Headers**: Security headers (CSP, X-Frame-Options, etc.)
- **Caching**: Static assets cached for 1 year

## Troubleshooting

### "Project not found" error

- Verify `VERCEL_PROJECT_ID` matches your project
- Check `VERCEL_ORG_ID` is correct (team_xxx or user_xxx)

### "Unauthorized" error

- Regenerate `VERCEL_TOKEN`
- Ensure token has **Full Account** scope
- Update GitHub secret with new token

### Build fails

- Check build logs in Vercel dashboard
- Verify `dist/demo/browser` directory exists after build
- Test build locally: `npm run build`

### Deployment succeeds but site doesn't work

- Check `vercel.json` output directory matches Angular build output
- Verify routing configuration for SPA
- Check browser console for errors

## Environment Variables

To add environment variables to Vercel:

1. **Vercel Dashboard → Project → Settings → Environment Variables**
2. Add variables for each environment:
   - Production
   - Preview
   - Development

Example variables:

- `API_URL`
- `ANALYTICS_ID`
- `FEATURE_FLAGS_URL`

## Custom Domains

1. **Vercel Dashboard → Project → Settings → Domains**
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## Monitoring

- **Vercel Analytics**: https://vercel.com/docs/analytics
- **Vercel Logs**: Real-time function logs
- **GitHub Actions**: Build and deployment logs

## Quick Reference

### Deployment Flow

```
Push tag (v1.2.3)
    ↓
GitHub Actions triggered
    ↓
deploy-staging job
    ├─ Checkout code
    ├─ Install & build
    └─ Deploy to Vercel (staging project)
    ↓
deploy-production job (requires approval)
    ├─ Checkout code
    ├─ Install & build
    ├─ Deploy to Vercel (production project)
    └─ Create GitHub Release
```

### How Secrets Are Used

- **`VERCEL_TOKEN`**: Authenticates with Vercel API (shared across both environments)
- **`VERCEL_ORG_ID`**: Identifies your Vercel team/account (shared across both environments)
- **`VERCEL_PROJECT_ID`**: Different for each environment (staging vs production)
  - Pulled from GitHub Environment secrets automatically
  - Staging job uses `staging` environment → gets staging project ID
  - Production job uses `production` environment → gets production project ID

### Useful Commands

```bash
# Test deployment locally
vercel --prod

# Check deployment status
vercel ls

# View project settings
vercel project ls

# Get current project info
vercel inspect
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Angular on Vercel](https://vercel.com/guides/deploying-angular-with-vercel)
- [GitHub Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)

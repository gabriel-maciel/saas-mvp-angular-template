# Vercel Deployment Setup

This guide walks you through setting up automated Vercel deployments for this project.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel

## Step 1: Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. **Framework Preset**: Select "Other" (we have custom build config)
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist/demo/browser`
7. Click **"Deploy"** to create the project

## Step 2: Get Vercel Credentials

### Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it: `GitHub Actions Deploy`
4. Scope: **Full Account**
5. Expiration: Choose based on your preference
6. Click **"Create"**
7. **Copy the token** (you won't see it again!)

### Get Organization ID

```bash
# Install Vercel CLI locally
npm install -g vercel

# Login to Vercel
vercel login

# Link your project (run in project root)
vercel link

# This creates .vercel/project.json with your IDs
```

Or get it from the Vercel dashboard:

1. Go to your project settings
2. URL format: `https://vercel.com/<team-name>/<project-name>/settings`
3. Organization ID is in the URL or settings

### Get Project ID

After running `vercel link`, check `.vercel/project.json`:

```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

## Step 3: Configure GitHub Secrets

Go to your GitHub repository:
**Settings → Secrets and variables → Actions → New repository secret**

Add these three secrets:

| Secret Name         | Value                                       |
| ------------------- | ------------------------------------------- |
| `VERCEL_TOKEN`      | Your Vercel token from Step 2               |
| `VERCEL_ORG_ID`     | Your organization ID (team_xxx or user_xxx) |
| `VERCEL_PROJECT_ID` | Your project ID (prj_xxx)                   |

## Step 4: Configure Environments (Optional)

For staging/production separation:

1. **GitHub Settings → Environments**
2. Create two environments:
   - `staging`
   - `production`
3. Add protection rules to `production`:
   - ✅ Required reviewers
   - ✅ Wait timer (optional)

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

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Angular on Vercel](https://vercel.com/guides/deploying-angular-with-vercel)

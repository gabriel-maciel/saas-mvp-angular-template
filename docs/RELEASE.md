# Release & Deployment Guide

This document describes the release and deployment workflow following Trunk-Based Development principles.

> **📘 First-time setup?** See [VERCEL_SETUP.md](./VERCEL_SETUP.md) for Vercel deployment configuration.

## Overview

- **Single trunk**: `main` is always releasable
- **Release cadence**: Frequent, small releases (multiple per week preferred)
- **Versioning**: Semantic Versioning (SemVer)
- **Deployment**: Automated via GitHub Actions on tag push

## Release Process

### 1. Create a Release Tag

From the `main` branch, run:

```bash
# Patch release (0.1.0 → 0.1.1) - bug fixes
npm run release:tag

# Minor release (0.1.0 → 0.2.0) - new features
npm run release:tag minor

# Major release (0.1.0 → 1.0.0) - breaking changes
npm run release:tag major
```

**What happens:**

1. ✅ Verifies you're on `main` branch
2. ✅ Ensures working tree is clean
3. ✅ Pulls latest from origin
4. ✅ Bumps version in `package.json`
5. ✅ Creates annotated Git tag `vX.Y.Z`
6. ✅ Pushes tag to GitHub
7. ✅ Triggers deployment workflow automatically

### 2. Automated Deployment

When a tag is pushed, GitHub Actions automatically:

1. **Staging deployment** - Deploys to staging environment first
2. **Production deployment** - After staging succeeds, deploys to production
3. **GitHub Release** - Creates a GitHub release with changelog

Monitor deployment at: `https://github.com/YOUR_ORG/YOUR_REPO/actions`

### 3. Manual Deployment (Rollback)

To deploy a specific version (e.g., rollback to previous version):

```bash
# List recent tags
git tag -l "v*" | tail -10

# Deploy specific version
npm run release:deploy -- v0.1.0
```

This triggers the deployment workflow for the specified tag.

## Semantic Versioning

Follow [SemVer](https://semver.org/) guidelines:

- **Patch** (0.1.0 → 0.1.1): Bug fixes, internal changes
- **Minor** (0.1.0 → 0.2.0): New features, backward-compatible
- **Major** (0.1.0 → 1.0.0): Breaking changes

## Changelog

Update `CHANGELOG.md` before creating a release tag:

```markdown
## [Unreleased]

### Added

- New feature X

### Fixed

- Bug Y

### Changed

- Updated Z
```

On release, move items from `[Unreleased]` to the new version section.

## Deployment Configuration

### GitHub Actions Environments

Configure in GitHub: **Settings → Environments**

1. **staging**
   - URL: `https://staging.example.com`
   - Auto-deploys on tag push
2. **production**
   - URL: `https://example.com`
   - Requires staging success
   - Optional: Add protection rules (required reviewers)

### Deployment Targets

Update `.github/workflows/deploy.yml` with your deployment commands:

**Vercel:**

```yaml
- name: Deploy to production
  run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

**Netlify:**

```yaml
- name: Deploy to production
  run: netlify deploy --prod --auth=${{ secrets.NETLIFY_TOKEN }}
```

**AWS S3:**

```yaml
- name: Deploy to production
  run: aws s3 sync dist/ s3://your-bucket/
```

**Firebase:**

```yaml
- name: Deploy to production
  run: firebase deploy --only hosting:production
```

## Secrets Configuration

Add secrets in GitHub: **Settings → Secrets and variables → Actions**

Required secrets depend on your deployment target:

- `VERCEL_TOKEN`
- `NETLIFY_TOKEN`
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
- `FIREBASE_TOKEN`

## Rollback Procedure

If a release has issues:

1. **Identify last good version:**

   ```bash
   git tag -l "v*" | tail -10
   ```

2. **Deploy previous version:**

   ```bash
   npm run release:deploy -- v0.1.0
   ```

3. **Fix forward (preferred):**
   - Create hotfix branch from `main`
   - Fix the issue
   - Merge to `main`
   - Create new patch release

## Best Practices

- ✅ Keep releases small and frequent
- ✅ Test thoroughly in staging before production
- ✅ Update CHANGELOG.md before releasing
- ✅ Include migration notes for breaking changes
- ✅ Monitor deployment logs and metrics
- ✅ Have rollback plan ready
- ✅ Communicate releases to team

## Troubleshooting

### "Must be on main branch" error

```bash
git checkout main
git pull origin main
```

### "Working tree is not clean" error

```bash
git status
git add .
git commit -m "chore: prepare for release"
```

### Tag already exists

```bash
# Delete local tag
git tag -d v0.1.0

# Delete remote tag
git push origin :refs/tags/v0.1.0
```

### Deployment failed

1. Check GitHub Actions logs
2. Verify secrets are configured
3. Test deployment command locally
4. Rollback if necessary: `npm run release:deploy -- vX.Y.Z`

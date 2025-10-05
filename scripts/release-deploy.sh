#!/bin/bash
set -e

# Manual deployment script for specific version (rollback scenario)
# Usage: npm run release:deploy -- v1.2.3

VERSION=$1

if [ -z "$VERSION" ]; then
  echo "❌ Error: Version tag required"
  echo "   Usage: npm run release:deploy -- v1.2.3"
  echo ""
  echo "   Available tags:"
  git tag -l "v*" | tail -10
  exit 1
fi

# Verify tag exists
if ! git rev-parse "$VERSION" >/dev/null 2>&1; then
  echo "❌ Error: Tag $VERSION does not exist"
  echo ""
  echo "   Available tags:"
  git tag -l "v*" | tail -10
  exit 1
fi

echo "🚀 Triggering deployment for $VERSION..."
echo ""
echo "   This will trigger a GitHub Actions workflow to deploy $VERSION to production."
echo ""

# Trigger GitHub Actions workflow with specific tag
gh workflow run deploy.yml --ref "$VERSION"

echo "✅ Deployment triggered for $VERSION"
echo ""
echo "   Monitor deployment: https://github.com/$(git config --get remote.origin.url | sed 's/.*:\(.*\)\.git/\1/')/actions"

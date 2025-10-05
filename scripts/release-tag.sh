#!/bin/bash
set -e

# Release tagging script for Trunk-Based Development
# Usage: npm run release:tag [patch|minor|major]

VERSION_TYPE=${1:-patch}

echo "🏷️  Creating release tag..."

# Ensure we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "❌ Error: Must be on main branch to create a release tag"
  echo "   Current branch: $CURRENT_BRANCH"
  exit 1
fi

# Ensure working tree is clean
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ Error: Working tree is not clean. Commit or stash changes first."
  git status --short
  exit 1
fi

# Pull latest from main
echo "📥 Pulling latest from main..."
git pull origin main

# Bump version and create tag
echo "📦 Bumping version ($VERSION_TYPE)..."
npm version $VERSION_TYPE -m "chore: release v%s"

NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ Created tag v$NEW_VERSION"

# Push tag to trigger deployment
echo "🚀 Pushing tag to origin..."
git push --follow-tags

echo ""
echo "✅ Release tag v$NEW_VERSION created and pushed!"
echo "   GitHub Actions will now deploy to production."
echo ""
echo "   Monitor deployment: https://github.com/$(git config --get remote.origin.url | sed 's/.*:\(.*\)\.git/\1/')/actions"

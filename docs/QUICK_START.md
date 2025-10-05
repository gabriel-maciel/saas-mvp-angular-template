# Quick Start Guide

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

## Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd saas-mvp-angular-template

# Install dependencies
npm install

# Generate theme CSS variables
npm run theme:build

# Start development server
npm run dev
```

The app will be available at `http://localhost:4200`

## First Steps

### 1. Customize the Theme

Edit `config/theme.json` to match your brand:

```json
{
  "brand": {
    "primary": "#your-color",
    "secondary": "#your-color"
  }
}
```

Then rebuild the theme:

```bash
npm run theme:build
```

### 2. Create Your First Component

```bash
# Create a new component in the UI library
mkdir -p libs/ui/primitives/src/lib/card
touch libs/ui/primitives/src/lib/card/card.component.ts
```

**card.component.ts**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <ng-content />
    </div>
  `,
})
export class CardComponent {}
```

Export it in `libs/ui/primitives/src/index.ts`:

```typescript
export * from './lib/card/card.component';
```

Use it in your app:

```typescript
import { CardComponent } from '@saas-mvp/ui/primitives';

@Component({
  imports: [CardComponent],
  template: `<ui-card>Hello World</ui-card>`
})
```

### 3. Add a Feature Flag

Edit `config/feature-flags.json`:

```json
{
  "flags": {
    "myFeature": {
      "enabled": false,
      "description": "My new feature"
    }
  }
}
```

Use in template:

```html
<div *featureFlag="'myFeature'">This shows when the flag is enabled</div>
```

### 4. Create a New Page

**apps/demo/src/app/pages/about/about.component.ts**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-4">About</h1>
      <p class="text-lg text-gray-600">About page content</p>
    </div>
  `,
})
export class AboutComponent {}
```

Add route in `apps/demo/src/app/app.routes.ts`:

```typescript
{
  path: 'about',
  loadComponent: () =>
    import('./pages/about/about.component').then(m => m.AboutComponent),
}
```

## Common Tasks

### Run Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run with coverage
npm run test -- --code-coverage
```

### Lint and Format

```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Build for Production

```bash
npm run build
```

Output will be in `dist/demo/`

### Run Full CI Pipeline Locally

```bash
npm run ci
```

This runs: format check → lint → typecheck → test → build

## Project Structure

```
apps/demo/          # Your application
libs/
  core/            # Core utilities (no UI)
    config/        # Feature flags, config
  ui/              # Design system
    primitives/    # Reusable components
  features/        # Business features
config/            # Theme and feature flags
docs/              # Documentation
scripts/           # Build scripts
```

## Development Workflow

### Creating a Feature

1. **Create a branch**:

   ```bash
   git checkout -b feat/add-user-profile
   ```

2. **Add feature flag** (if incomplete):

   ```json
   {
     "flags": {
       "userProfile": {
         "enabled": false,
         "description": "User profile page"
       }
     }
   }
   ```

3. **Implement the feature**:
   - Create components in `libs/features/user-profile/`
   - Add tests
   - Use feature flag in routes/components

4. **Test locally**:

   ```bash
   npm run ci
   ```

5. **Commit and push**:

   ```bash
   git add .
   git commit -m "feat: add user profile page"
   git push origin feat/add-user-profile
   ```

6. **Create PR** and get review

7. **Merge to main** (feature still behind flag)

8. **Enable flag** in staging/production when ready

### Updating the Theme

1. Edit `config/theme.json`
2. Run `npm run theme:build`
3. Verify changes in browser
4. Commit both `theme.json` and generated `theme.vars.css`

### Adding a New Library

```bash
# Create directory structure
mkdir -p libs/features/my-feature/src/lib
touch libs/features/my-feature/src/index.ts

# Add to tsconfig.base.json paths
"@saas-mvp/features/my-feature": ["libs/features/my-feature/src/index.ts"]
```

## Troubleshooting

### Port 4200 already in use

```bash
# Kill the process using port 4200
lsof -ti:4200 | xargs kill -9

# Or use a different port
ng serve --port 4300
```

### Module not found errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Theme changes not reflecting

```bash
# Rebuild theme
npm run theme:build

# Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
```

### Tests failing

```bash
# Clear Karma cache
rm -rf .angular/cache

# Run tests again
npm run test
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture
- Check [README.md](../README.md) for full feature list
- Explore the demo app at `apps/demo/src/app/`
- Customize `config/theme.json` for your brand
- Add your first feature behind a feature flag

## Getting Help

- Check the [README](../README.md)
- Review [ARCHITECTURE](./ARCHITECTURE.md)
- Look at existing components in `libs/ui/primitives/`
- Examine the demo app in `apps/demo/`

## Useful Commands Reference

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start dev server             |
| `npm run build`       | Production build             |
| `npm run test`        | Run tests                    |
| `npm run lint`        | Lint code                    |
| `npm run format`      | Format code                  |
| `npm run theme:build` | Generate CSS from theme.json |
| `npm run ci`          | Run full CI pipeline         |

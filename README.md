# SaaS MVP Angular Template

A production-ready Angular 20 + Tailwind CSS template following Trunk-Based Development principles.

## Features

- ✅ **Angular 20** with standalone components, signals, and modern control flow
- ✅ **Tailwind CSS** with token-based theming system
- ✅ **Feature Flags** for dark-launch and gradual rollouts
- ✅ **Monorepo Structure** with clean architecture (apps/libs separation)
- ✅ **CI/CD Ready** with lint, test, build, and budget enforcement
- ✅ **Type-safe** with strict TypeScript configuration
- ✅ **Accessible** with WCAG AA target and semantic HTML
- ✅ **Performance Budgets** enforced in build

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run linting
npm run lint

# Format code
npm run format
```

## Project Structure

```
├── apps/
│   └── demo/                 # Demo application
│       ├── src/
│       │   ├── app/          # App components and routes
│       │   ├── main.ts       # Bootstrap file
│       │   └── styles.css    # Global styles
│       └── project.json
├── libs/
│   ├── core/                 # Core utilities and services
│   │   └── config/           # Feature flags, environment config
│   ├── ui/                   # Design system
│   │   ├── tokens/           # Theme tokens and Tailwind plugin
│   │   └── primitives/       # Reusable UI components
│   └── features/             # Feature modules
│       └── pricing/          # Example feature
├── config/
│   ├── theme.json            # Design tokens (colors, spacing, etc.)
│   └── feature-flags.json    # Feature flag configuration
├── scripts/
│   └── build-theme.js        # Generate CSS variables from tokens
└── angular.json              # Angular CLI configuration
```

## Theme System

The theme system is token-based and flows from `config/theme.json` to CSS variables to Tailwind utilities.

### Customizing the Theme

1. Edit `config/theme.json` to change colors, spacing, typography, etc.
2. Run `npm run theme:build` to generate CSS variables
3. Use Tailwind utilities that reference the tokens:

```html
<button class="bg-primary text-white rounded-lg shadow-lg px-4 py-2">Click me</button>
```

### Available Token Categories

- **Brand Colors**: `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info`
- **Typography**: Font families and size scale
- **Spacing**: Consistent spacing scale (0-24)
- **Radius**: Border radius values
- **Shadow**: Box shadow definitions

## Feature Flags

Feature flags allow you to ship incomplete features safely behind runtime toggles.

### Adding a Feature Flag

1. Add to `config/feature-flags.json`:

```json
{
  "flags": {
    "myNewFeature": {
      "enabled": false,
      "description": "My new feature description"
    }
  }
}
```

2. Use in templates with the directive:

```html
<div *featureFlag="'myNewFeature'">This content only shows when the flag is enabled</div>
```

3. Or check programmatically:

```typescript
import { FeatureFlagsService } from '@saas-mvp/core/config';

constructor(private featureFlags: FeatureFlagsService) {}

ngOnInit() {
  if (this.featureFlags.isEnabled('myNewFeature')) {
    // Feature-specific logic
  }
}
```

## Development Workflow

This project follows **Trunk-Based Development**:

- Single trunk: `main` is always releasable
- Short-lived feature branches (≤ 1 day)
- Small PRs (≤ ~300 lines)
- Feature flags for incomplete work
- CI must stay green

### Creating a Feature

```bash
# Create a short-lived branch
git checkout -b feat/ticket-123-add-button

# Make small, focused changes
# Add feature flag if incomplete

# Commit and push
git add .
git commit -m "feat: add primary button component"
git push origin feat/ticket-123-add-button

# Create PR, get review, merge to main
```

## CI/CD Pipeline

The CI pipeline runs on every PR and push to `main`:

1. ✅ Format check (`prettier`)
2. ✅ Lint (`eslint` + `angular-eslint`)
3. ✅ Type check (`tsc --noEmit`)
4. ✅ Unit tests (`karma` + `jasmine`)
5. ✅ Build with bundle size budgets
6. ✅ Upload build artifacts

### Bundle Size Budgets

Defined in `angular.json`:

- Initial bundle: 500KB warning, 1MB error
- Component styles: 2KB warning, 4KB error

## Scripts Reference

| Script                   | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run dev`            | Start development server                |
| `npm run build`          | Production build                        |
| `npm run test`           | Run unit tests                          |
| `npm run lint`           | Lint all files                          |
| `npm run format`         | Format all files with Prettier          |
| `npm run format:check`   | Check formatting without changes        |
| `npm run typecheck`      | Run TypeScript compiler checks          |
| `npm run theme:build`    | Generate CSS variables from theme.json  |
| `npm run theme:watch`    | Watch theme.json and rebuild on changes |
| `npm run demo`           | Alias for dev (preview/demo mode)       |
| `npm run story`          | Alias for dev (Storybook-like preview)  |
| `npm run release:tag`    | Create release tag and trigger deploy   |
| `npm run release:deploy` | Deploy specific version (rollback)      |
| `npm run ci`             | Run full CI pipeline locally            |

## Release & Deployment

This project follows Trunk-Based Development with automated releases:

```bash
# Create a release (patch/minor/major)
npm run release:tag          # Creates v0.1.1 (patch)
npm run release:tag minor    # Creates v0.2.0 (minor)
npm run release:tag major    # Creates v1.0.0 (major)

# Rollback to previous version
npm run release:deploy -- v0.1.0
```

**What happens on release:**

1. Version bumped in `package.json`
2. Git tag created (`vX.Y.Z`)
3. Tag pushed to GitHub
4. GitHub Actions deploys to staging → production
5. GitHub Release created with changelog

See [docs/RELEASE.md](./docs/RELEASE.md) for detailed release workflow.

## Architecture Principles

- **Design System First**: Tokens → utilities → primitives → components → pages
- **Clean Architecture**: Features isolated; shared utilities in well-named libs
- **No Hardcoded Values**: All colors, spacing, etc. flow from theme tokens
- **Feature Flags**: Ship safely with dark launches
- **Accessibility**: WCAG AA target; semantic HTML; keyboard navigation
- **Performance**: LCP < 2.5s, CLS < 0.1; budgets enforced

## Documentation

- [Quick Start Guide](./docs/QUICK_START.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Release & Deployment](./docs/RELEASE.md)

## Contributing

1. Keep PRs small and focused
2. Add tests for new code
3. Follow the existing code style
4. Use feature flags for incomplete features
5. Update documentation as needed

## License

MIT

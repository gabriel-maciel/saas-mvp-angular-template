# Architecture Overview

## Design Principles

This template follows a **Design System First** approach with clean architecture principles:

```
Tokens → Utilities → Primitives → Components → Pages
```

### Key Principles

1. **Single Source of Truth**: All design tokens live in `config/theme.json`
2. **No Hardcoded Values**: Colors, spacing, typography flow from tokens
3. **Feature Isolation**: Features are self-contained and don't depend on each other
4. **Dependency Rules**: Features → (UI + Core); UI → Core; Core → nothing

## Directory Structure

```
├── apps/demo/              # Demo application
│   ├── src/
│   │   ├── app/            # Application code
│   │   │   ├── pages/      # Route pages
│   │   │   ├── app.component.ts
│   │   │   └── app.routes.ts
│   │   ├── main.ts         # Bootstrap
│   │   ├── styles.css      # Global styles
│   │   └── theme.vars.css  # Generated CSS variables
│   └── public/             # Static assets
│
├── libs/
│   ├── core/               # Core utilities (no UI)
│   │   ├── config/         # Feature flags, environment
│   │   ├── auth/           # Auth interfaces, guards
│   │   └── http/           # HTTP interceptors, services
│   │
│   ├── ui/                 # Design system
│   │   ├── tokens/         # Theme plugin, CSS var bridge
│   │   └── primitives/     # Button, Input, Card, Modal, etc.
│   │
│   └── features/           # Business features
│       ├── pricing/        # Pricing tables, plans
│       ├── billing/        # Billing forms, history
│       └── settings/       # User settings, preferences
│
├── config/                 # Configuration files
│   ├── theme.json          # Design tokens
│   ├── theme.schema.json   # Token validation
│   ├── feature-flags.json  # Feature toggles
│   └── feature-flags.schema.json
│
└── scripts/                # Build scripts
    └── build-theme.js      # Generate CSS vars from tokens
```

## Module Boundaries

### Dependency Graph

```
┌─────────┐
│   App   │
└────┬────┘
     │
     ├──────────┬──────────┐
     │          │          │
┌────▼────┐ ┌──▼───┐ ┌───▼────┐
│Features │ │  UI  │ │  Core  │
└────┬────┘ └──┬───┘ └────────┘
     │         │
     └────┬────┘
          │
     ┌────▼────┐
     │  Core   │
     └─────────┘
```

### Rules

- **Apps** can depend on: Features, UI, Core
- **Features** can depend on: UI, Core (NOT other features)
- **UI** can depend on: Core (NOT features)
- **Core** can depend on: Nothing (pure utilities)

## Theme System

### Flow

```
config/theme.json
    ↓
scripts/build-theme.js
    ↓
apps/demo/src/theme.vars.css (CSS variables)
    ↓
tailwind.config.js (Tailwind utilities)
    ↓
Components (use Tailwind classes)
```

### Example

**theme.json**:
```json
{
  "brand": {
    "primary": "#3b82f6"
  }
}
```

**Generated CSS**:
```css
:root {
  --color-primary: #3b82f6;
}
```

**Tailwind Config**:
```js
colors: {
  primary: 'var(--color-primary)'
}
```

**Component**:
```html
<button class="bg-primary">Click</button>
```

## Feature Flags

### Purpose

- Ship incomplete features safely
- Gradual rollouts (A/B testing)
- Dark launches
- Emergency kill switches

### Usage

**Configuration** (`config/feature-flags.json`):
```json
{
  "flags": {
    "newDashboard": {
      "enabled": false,
      "description": "New dashboard redesign",
      "rolloutPercentage": 10
    }
  }
}
```

**In Templates**:
```html
<div *featureFlag="'newDashboard'">
  New dashboard content
</div>
```

**In Code**:
```typescript
if (this.featureFlags.isEnabled('newDashboard')) {
  // Feature logic
}
```

### Lifecycle

1. **Add flag** (default: off)
2. **Implement behind flag**
3. **Ship to main** (flag still off)
4. **Enable in staging**
5. **Gradual rollout in prod** (10% → 50% → 100%)
6. **Remove flag + dead code** (within one minor release)

## Testing Strategy

### Unit Tests

- **Components**: Render, inputs/outputs, keyboard navigation
- **Services**: Public API contracts
- **Directives**: Behavior and DOM manipulation
- **Pipes**: Transformations

### Coverage Threshold

- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --code-coverage
```

## Performance

### Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 100ms

### Bundle Budgets

Enforced in `angular.json`:

- Initial bundle: 500KB warning, 1MB error
- Component styles: 2KB warning, 4KB error

### Optimization Techniques

1. **Route-level lazy loading** (default)
2. **Tree-shaking** (production builds)
3. **Tailwind purging** (removes unused classes)
4. **Image optimization** (width/height, lazy loading)
5. **Code splitting** (dynamic imports for large features)

## Accessibility

### Standards

- **WCAG 2.1 Level AA** compliance target
- Semantic HTML elements
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Proper ARIA labels and roles
- [ ] Alt text for images (or `role="presentation"`)
- [ ] Color contrast ratios meet AA standards
- [ ] Form inputs have associated labels

## CI/CD Pipeline

### Stages

1. **Format Check**: Prettier
2. **Lint**: ESLint + Angular ESLint
3. **Type Check**: TypeScript compiler
4. **Unit Tests**: Karma + Jasmine
5. **Build**: Production build with budgets
6. **Artifacts**: Upload dist/ for deployment

### Local CI

Run the full pipeline locally:

```bash
npm run ci
```

### Branch Protection

- All checks must pass
- At least 1 approval required
- Up-to-date with main

## Deployment

### Environments

- **Development**: Local (`npm run dev`)
- **Staging**: Auto-deploy from `main`
- **Production**: Manual promotion via tags

### Release Process

1. Merge PR to `main`
2. Auto-deploy to staging
3. Verify in staging
4. Tag release: `git tag v1.0.0`
5. Push tag: `git push origin v1.0.0`
6. Auto-deploy to production

## Security

### Best Practices

- **Input Sanitization**: Use Angular's built-in sanitization
- **No Dangerous APIs**: Avoid `innerHTML`, `bypassSecurityTrust*`
- **Auth Guards**: Protect routes requiring authentication
- **Minimum Privilege**: Check permissions at route and component level
- **No Secrets in Frontend**: Use environment variables, never commit secrets

### Threat Model

| Threat | Mitigation |
|--------|------------|
| XSS | Angular's automatic sanitization |
| CSRF | HTTP-only cookies, CSRF tokens |
| Injection | Parameterized queries, input validation |
| Auth bypass | Route guards, server-side validation |

## Monitoring

### Metrics to Track

- **Performance**: LCP, CLS, FID (Lighthouse CI)
- **Errors**: Console errors, unhandled exceptions
- **Feature Flags**: Usage rates, rollout percentages
- **Bundle Size**: Track over time, enforce budgets

### Tools

- **Lighthouse CI**: Performance budgets in CI
- **Bundle Analyzer**: Visualize bundle composition
- **Source Maps**: Debug production issues

## Future Enhancements

- [ ] Storybook for component documentation
- [ ] E2E tests with Playwright
- [ ] Visual regression testing
- [ ] i18n support (ngx-translate)
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) support
- [ ] Server-Side Rendering (SSR) with Angular Universal

## Summary

Initial setup of the Angular 20 + Tailwind SaaS MVP template following Trunk-Based Development principles.

## Changes

- **Angular 20 workspace** with standalone components and modern APIs
- **Tailwind CSS integration** with design token system (config/theme.json)
- **Theme configuration** with JSON schema validation
- **Core architecture**: apps/demo + libs structure (core/config, ui/primitives)
- **Feature flags system** with directive and service
- **CI/CD pipeline** with GitHub Actions (lint, test, build, budgets)
- **Bundle size budgets** and performance monitoring setup
- **Accessibility & i18n** foundation
- **Documentation**: ARCHITECTURE.md, QUICK_START.md

## Definition of Done

- ✅ Tests for new code (button component has spec)
- ✅ Lint/format clean
- ✅ Basic a11y (button component has proper roles)
- ✅ i18n keys structure ready
- ✅ Demo route available at /
- ✅ No hardcoded colors/spacing (uses tokens + Tailwind)
- ✅ Docs explain architecture and configuration
- ✅ Feature flags system in place

## Testing

```bash
npm install
npm run lint
npm run test
npm run build
```

## Notes

- This is the foundational template structure
- All future features will build on this base
- CI pipeline will enforce budgets and quality gates

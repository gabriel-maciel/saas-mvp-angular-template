# Internationalization (i18n)

This directory contains translation files for the application.

## Files

- **`messages.xlf`** - Source translation file (English) extracted from components

## Workflow

### 1. Extract Translations

After adding or modifying i18n markers in components:

```bash
npm run i18n:extract
```

This generates/updates `messages.xlf` with all translatable strings.

### 2. Create Language-Specific Files

Copy `messages.xlf` for each target language:

```bash
cp messages.xlf messages.es.xlf  # Spanish
cp messages.xlf messages.fr.xlf  # French
cp messages.xlf messages.pt.xlf  # Portuguese
```

### 3. Translate

Edit each language file and add `<target>` elements:

```xml
<trans-unit id="home.title" datatype="html">
  <source>Welcome to Your SaaS MVP</source>
  <target>Bienvenido a tu SaaS MVP</target>
</trans-unit>
```

### 4. Build for Specific Locale

Configure `angular.json` with locale-specific builds (see Angular i18n docs).

## i18n Marker Format

We use the `@@` prefix for custom IDs:

```html
<h1 i18n="@@home.title">Welcome</h1>
<button i18n="@@home.cta.getStarted">Get Started</button>
```

### Naming Convention

- **Page-level**: `pageName.section.element`
- **Component-level**: `componentName.element`
- **Shared**: `common.element`

Examples:

- `home.title`
- `pricing.starter.name`
- `header.nav.home`
- `common.button.save`

## Resources

- [Angular i18n Guide](https://angular.dev/guide/i18n)
- [XLIFF Format](https://en.wikipedia.org/wiki/XLIFF)

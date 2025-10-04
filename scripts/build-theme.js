#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const themeConfigPath = path.join(__dirname, '../config/theme.json');
const outputPath = path.join(__dirname, '../apps/demo/src/theme.vars.css');

try {
  const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

  let cssVars = ':root {\n';

  // Brand colors
  if (themeConfig.brand) {
    Object.entries(themeConfig.brand).forEach(([key, value]) => {
      cssVars += `  --color-${key}: ${value};\n`;
    });
  }

  // Typography
  if (themeConfig.typography) {
    if (themeConfig.typography.fontFamily) {
      Object.entries(themeConfig.typography.fontFamily).forEach(([key, value]) => {
        cssVars += `  --font-family-${key}: ${value};\n`;
      });
    }
    if (themeConfig.typography.scale) {
      Object.entries(themeConfig.typography.scale).forEach(([key, value]) => {
        cssVars += `  --font-size-${key}: ${value};\n`;
      });
    }
  }

  // Spacing
  if (themeConfig.spacing) {
    Object.entries(themeConfig.spacing).forEach(([key, value]) => {
      cssVars += `  --spacing-${key}: ${value};\n`;
    });
  }

  // Radius
  if (themeConfig.radius) {
    Object.entries(themeConfig.radius).forEach(([key, value]) => {
      cssVars += `  --radius-${key}: ${value};\n`;
    });
  }

  // Shadow
  if (themeConfig.shadow) {
    Object.entries(themeConfig.shadow).forEach(([key, value]) => {
      cssVars += `  --shadow-${key}: ${value};\n`;
    });
  }

  cssVars += '}\n';

  fs.writeFileSync(outputPath, cssVars, 'utf8');
  console.log('✅ Theme CSS variables generated:', outputPath);
} catch (error) {
  console.error('❌ Error building theme:', error.message);
  process.exit(1);
}

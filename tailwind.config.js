const theme = require('./config/theme.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/demo/src/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: ['var(--font-family-base)'],
        heading: ['var(--font-family-heading)'],
        mono: ['var(--font-family-mono)'],
      },
      fontSize: Object.fromEntries(
        Object.entries(theme.typography.scale).map(([key, value]) => [
          key,
          `var(--font-size-${key})`,
        ])
      ),
      spacing: Object.fromEntries(
        Object.entries(theme.spacing).map(([key, value]) => [key, `var(--spacing-${key})`])
      ),
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-base)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-base)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
    },
  },
  plugins: [],
};

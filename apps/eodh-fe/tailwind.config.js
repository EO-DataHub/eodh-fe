const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');
const { lightThemeConfig } = require('../../libs/shared/theme/src/index.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: { ...lightThemeConfig },
  },
  safelist: [
    {
      pattern: /text-(body-)?(large|medium|small)-(bold|semibold|regular)/,
    },
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};

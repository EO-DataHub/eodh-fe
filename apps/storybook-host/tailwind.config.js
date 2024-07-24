const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');
const { colors, fontSize, shadow } = require('../../libs/shared/theme/src/index.ts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/**/{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,js,jsx,html}',
    'libs/**/{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,js,jsx,html}',
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...colors.light,
      },
      fontSize: {
        ...fontSize,
      },
      boxShadow: {
        ...shadow,
      },
      textShadow: {
        ...shadow,
      },
    },
  },
  safelist: [
    {
      pattern: /text-(large|medium|small)-(bold|semibold|regular)/,
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

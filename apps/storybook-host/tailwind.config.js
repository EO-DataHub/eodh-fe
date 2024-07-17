const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const plugin = require('tailwindcss/plugin');
const { join } = require('path');
const colors = require('../../libs/shared/theme/src/lib/colors');
const fontSize = require('../../libs/shared/theme/src/lib/font-size');
const shadow = require('../../libs/shared/theme/src/lib/shadow');

console.log('colors', colors);
console.log('fontSize', fontSize);
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
        ...colors.default.lightMode,
      },
      fontSize: {
        ...fontSize.default,
      },
      boxShadow: {
        ...shadow.default,
      },
      textShadow: {
        ...shadow.default,
      },
    },
  },
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

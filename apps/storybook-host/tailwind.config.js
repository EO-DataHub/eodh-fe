const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const tokens = require('../../libs/shared/theme/src/lib/tokens');

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
        ...tokens.default.colors,
      },
      fontSize: {
        ...tokens.default.fontSize,
      },
    },
  },
  plugins: [],
};

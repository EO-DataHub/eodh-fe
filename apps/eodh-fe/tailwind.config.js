const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { colors, fontSize } = require('../../libs/shared/theme/src/lib/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontSize: {
        ...fontSize,
      },
    },
  },
  plugins: [],
};

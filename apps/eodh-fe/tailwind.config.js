const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require('../../libs/shared/theme/src/lib/colors');
const fontSize = require('../../libs/shared/theme/src/lib/font-size');
const boxShadow = require('../../libs/shared/theme/src/lib/shadow');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        ...colors.lightMode,
      },
      fontSize: {
        ...fontSize,
      },
      boxShadow: {
        ...boxShadow,
      },
    },
  },
  plugins: [],
};

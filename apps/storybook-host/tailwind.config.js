const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const themeConfig = require('../../libs/shared/theme/src/index.ts');

console.log('themeConfig', themeConfig);

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
        ...themeConfig.colors.light,
      },
      fontSize: {
        ...themeConfig.fontSize,
      },
    },
  },
  plugins: [],
};

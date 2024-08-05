import colors from './lib/colors';
import fontSize from './lib/font-size';
import shadow from './lib/shadow';

const lightThemeConfig = {
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
  spacing: {
    '6.5': '1.625rem',
  },
};

const darkThemeConfig = {
  colors: {
    ...colors.dark,
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
  spacing: {
    '6.5': '1.625rem',
  },
};
export { lightThemeConfig, darkThemeConfig, colors, fontSize, shadow };

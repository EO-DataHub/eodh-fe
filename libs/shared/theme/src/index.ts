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
};
export { lightThemeConfig, darkThemeConfig };

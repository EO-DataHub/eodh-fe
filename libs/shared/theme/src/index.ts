import colors from './lib/colors';
import fontSize from './lib/font-size';

const lightThemeConfig = {
  colors: {
    ...colors.light,
  },
  fontSize: {
    ...fontSize,
  },
};

const darkThemeConfig = {
  colors: {
    ...colors.dark,
  },
  fontSize: {
    ...fontSize,
  },
};
export { lightThemeConfig, darkThemeConfig };

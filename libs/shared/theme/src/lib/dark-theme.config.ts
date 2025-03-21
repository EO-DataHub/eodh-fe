import { themeConfig } from './theme.config';

const colors = {
  primary: {
    DEFAULT: '#4483FF',
    main: '#4483FF',
    dark: '#2867E5',
    light: '#90B5FF',
    contrastText: '#FFFFFF',
  },
  bright: {
    DEFAULT: '#FFFFFF',
    main: '#FFFFFF',
    light: '#F6F6F6',
    mid: '#E7E7E7',
    dark: '#D8D8D8',
    contrastText: '#606060',
  },
  text: {
    DEFAULT: '#606060',
    primary: '#606060',
    light: '#A3A3A3',
    disabled: '#B4BBCA',
    visited: '#8F44FF',
  },
  background: {
    DEFAULT: '#2E2D2D',
    main: '#2E2D2D',
    contrastText: '#FFFFFF',
  },
  error: {
    DEFAULT: '#FF0000',
    main: '#FF0000',
    light: '##F5CFCF',
    contrastText: '#FFFFFF',
  },
  errorLight: {
    DEFAULT: '#F5CFCF',
    main: '#F5CFCF',
    contrastText: '#FF0000',
  },
  warning: {
    DEFAULT: '#FFD15B',
    warning: '#FFD15B',
    contrastText: '#874C07',
  },
  success: {
    DEFAULT: '#52BF49',
    main: '#52BF49',
    contrastText: '#FFFFFF',
  },
  information: {
    DEFAULT: '#4483FF',
    main: '#4483FF',
    contrastText: '#FFFFFF',
  },
  neutral: {
    DEFAULT: '#686868',
    light: '#A3A3A3',
    main: '#686868',
    dark: '#606060',
  },
  actionCreator: {
    data: '#FF7A00',
    area: '#3CAF5C',
    date: '#00B2FF',
    function: '#FF0000',
    contrastText: '#FFFFFF',
  },
};

export const darkThemeConfig = {
  colors,
  themeConfig,
};

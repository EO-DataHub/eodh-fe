module.exports = {
  colors: {
    // eg. bg-primary-light
    primary: {
      DEFAULT: '#4483FF',
      light: '#90B5FF',
      dark: '#2867E5',
      disabled: '#B4BBCA',
    },
    neutrals: {
      DEFAULT: '#A3A3A3',
      light: '#A3A3A3',
      mid: '#686868',
      dark: '#606060',
    },
    bright: {
      DEFAULT: '#FFFFFF',
      light: '#FAFAFA',
      mid: '#E7E7E7',
      dark: '#D8D8D8',
    },
    body_text: '#606060',
    background: '#F0F0F0',
    status: {
      error: {
        DEFAULT: '#FF0000',
        contrastColor: '#FFFFFF',
      },
      success: '#52BF49',
      warning: '#FFD15B',
      info: '#4483FF',
    },
  },
  // eg. text-small-semibold
  fontSize: {
    'small-semibold': ['8px', { lineHeight: '12px', fontWeight: '400' }],
    'small-medium': ['9px', { lineHeight: '13.5px', fontWeight: '500' }],
    'medium-bold': ['12px', { lineHeight: '18px', fontWeight: '700' }],
    'medium-semibold': ['12px', { lineHeight: '18px', fontWeight: '600' }],
    'medium-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
    'large-regular': ['14px', { lineHeight: '21px', fontWeight: '400' }],
    'large-bold': ['14px', { lineHeight: '21px', fontWeight: '700' }],
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
  },
  // Add more tokens as needed
};

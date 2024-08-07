export const fontSize = {
  'small-bold': ['10px', { lineHeight: '12px', fontWeight: '700' }],
  'small-semibold': ['8px', { lineHeight: '12px', fontWeight: '600' }],
  'small-regular': ['9px', { lineHeight: '13.5px', fontWeight: '500' }],
  'medium-bold': ['12px', { lineHeight: '18px', fontWeight: '700' }],
  'medium-semibold': ['12px', { lineHeight: '18px', fontWeight: '600' }],
  'medium-regular': ['12px', { lineHeight: '18px', fontWeight: '400' }],
  'large-bold': ['14px', { lineHeight: '21px', fontWeight: '700' }],
  'large-semibold': ['14px', { lineHeight: '21px', fontWeight: '600' }],
  'large-regular': ['14px', { lineHeight: '21px', fontWeight: '400' }],
};

export const shadow = {
  DEFAULT: '0px 4px 5px #00000033',
  text: '0px 2px 0px #00000026',
  'text-small': '0px 1px 0px #00000026',
};

export const spacing = {
  '6.5': '1.625rem',
};

export const themeConfig = {
  fontSize: {
    ...fontSize,
  },
  boxShadow: {
    ...shadow,
  },
  textShadow: {
    ...shadow,
  },
  spacing,
};

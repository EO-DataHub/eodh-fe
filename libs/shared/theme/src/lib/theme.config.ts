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
  'slider-thumb': '0 0 0 3px #fff, 0px 4px 5px 0px #00000033',
  'slider-thumb-highlighted': '0 0 0 3px #fff, 0 0 0 6px #BED4FF, 0px 6px 5px 1px #00000033',
  'data-range-picker': '0px -4px 10px 0px #0000001A',
  'action-creator': '0px 4px 10px 0px #00000010',
  'action-creator-node': '0px 0px 6px 0px transparent',
};

export const spacing = {
  '6.5': '1.625rem',
};

export const themeConfig = {
  fontSize: {
    ...fontSize,
    'action-creator-body': ['10px', { lineHeight: '12px', fontWeight: '500' }],
  },
  boxShadow: {
    ...shadow,
  },
  textShadow: {
    ...shadow,
  },
  spacing,
  animation: {
    'spin-cubic-bezier': 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
  },
};

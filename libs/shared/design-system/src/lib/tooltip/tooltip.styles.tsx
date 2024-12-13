import clsx from 'clsx';

export const tooltip = {
  baseStyles: `fixed z-50 bg-primary text-primary-contrastText p-3 rounded-lg shadow-lg flex justify-between items-center before:content-[''] before:absolute before:border-8 before:border-transparent w-52 h-max`,
  arrowStyles: {
    top: 'before:bottom-full before:left-[calc(50%-8px)]  before:border-b-primary',
    bottom: 'before:top-full before:left-[calc(50%-8px)]  before:border-t-primary',
    left: 'before:right-full before:top-[calc(50%-8px)] before:border-r-primary',
    right: 'before:left-full before:top-[calc(50%-8px)] before:border-l-primary',
  },
  getTooltipStyles: (tipLocation: 'top' | 'bottom' | 'left' | 'right') =>
    clsx(tooltip.baseStyles, tooltip.arrowStyles[tipLocation], 'overflow-visible z-10'),
};

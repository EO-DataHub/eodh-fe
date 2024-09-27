import clsx from 'clsx';

export const tooltip = {
  baseStyles: `absolute bg-primary text-primary-contrastText p-3 rounded-lg shadow-lg flex justify-between items-center before:content-[''] before:absolute before:border-8 before:border-transparent w-52`,
  arrowStyles: {
    top: 'before:bottom-full before:left-[calc(50%-8px)]  before:border-b-blue-500',
    bottom: 'before:top-full before:left-[calc(50%-8px)]  before:border-t-blue-500',
    left: 'before:right-full before:top-[calc(50%-8px)] before:border-r-blue-500',
    right: 'before:left-full before:top-[calc(50%-8px)] before:border-l-blue-500',
  },
  getTooltipStyles: (tipLocation: 'top' | 'bottom' | 'left' | 'right') =>
    clsx(
      tooltip.baseStyles,
      tooltip.arrowStyles[tipLocation],
      'absolute overflow-visible z-10 left-1/2 transform -translate-x-1/2'
    ),
};

import { Icon } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { PropsWithChildren, useCallback, useState } from 'react';
// import { tooltip } from './tooltip.styles';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface ITooltipProps {
  id: string;
  tipLocation: TTipLocation;
  content: string;
  className?: string;
}

export const Tooltip = ({ tipLocation, content, id, children }: PropsWithChildren<ITooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const baseStyles = `absolute bg-blue-500 text-white p-4 rounded-lg shadow-lg flex justify-between items-center before:content-[''] before:absolute before:border-8 before:border-transparent `;
  const arrowStyles = {
    top: 'before:bottom-full before:left-[calc(50%-8px)]  before:border-b-blue-500',
    bottom: 'before:top-full before:left-[calc(50%-8px)]  before:border-t-blue-500',
    left: 'before:right-full before:top-[calc(50%-8px)] before:border-r-blue-500',
    right: 'before:left-full before:top-[calc(50%-8px)] before:border-l-blue-500',
  };

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <div className='relative'>
      <div data-tooltip-id={id} onClick={handleClose}>
        {children}
      </div>
      {isOpen && (
        <div
          className={clsx(
            baseStyles,
            arrowStyles[tipLocation],
            'absolute overflow-visible z-10 left-1/2 transform -translate-x-1/2'
          )}
        >
          <span>{content}</span>
          <button className='ml-2' onClick={handleClose}>
            <Icon name='Close' />
          </button>
        </div>
      )}
    </div>
  );
};

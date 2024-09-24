import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '../icon/icon';
import { tooltip } from './tooltip.styles';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface ITooltipProps {
  tipLocation: TTipLocation;
  text: string;
  className?: string;
}

export const Tooltip = ({ tipLocation, text }: ITooltipProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const baseStyles = `bg-blue-500 text-white p-4 rounded-lg shadow-lg flex justify-between items-center before:content-[''] before:absolute before:border-8 before:border-transparent `;
  const arrowStyles = {
    top: 'before:bottom-full before:left-[calc(50%-8px)]  before:border-b-blue-500',
    bottom: 'before:top-full before:left-[calc(50%-8px)]  before:border-t-blue-500',
    left: 'before:right-full before:top-[calc(50%-8px)] before:border-r-blue-500',
    right: 'before:left-full before:top-[calc(50%-8px)] before:border-l-blue-500',
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    isOpen && (
      <div className={clsx(baseStyles, arrowStyles[tipLocation], 'relative')}>
        <span>{text}</span>
        <button className='ml-2' onClick={handleClose}>
          <Icon name='Close' />
        </button>
      </div>
    )
  );
};

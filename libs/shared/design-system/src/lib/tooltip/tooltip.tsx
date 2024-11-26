import clsx from 'clsx';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { Icon } from '../icon/icon';
import { Text } from '../text/text';
import { tooltip } from './tooltip.styles';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface ITooltipProps {
  tipLocation: TTipLocation;
  content: string | JSX.Element;
  className?: string;
  isOpen?: boolean;
  tooltipPosition?: React.CSSProperties;
}

export const Tooltip = ({
  tipLocation,
  content,
  isOpen,
  className,
  tooltipPosition,
}: PropsWithChildren<ITooltipProps>) => {
  const [isTooltipOpen, setIsOpen] = useState(isOpen);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isTooltipOpen) {
      setIsOpen(false);
    }
  }, [isTooltipOpen]);

  return (
    isTooltipOpen && (
      <div className={clsx(tooltip.getTooltipStyles(tipLocation), className)} style={tooltipPosition || undefined}>
        <Text content={content} type='div' fontSize='medium' fontWeight='semibold' />
        <button className='ml-2' onClick={handleClose}>
          <Icon name='Close' />
        </button>
      </div>
    )
  );
};

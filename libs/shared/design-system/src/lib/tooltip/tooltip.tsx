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
  onClose?: () => void;
}

export const Tooltip = ({
  tipLocation,
  content,
  isOpen,
  className,
  tooltipPosition,
  children,
  onClose,
}: PropsWithChildren<ITooltipProps>) => {
  const [isTooltipOpen, setIsOpen] = useState(isOpen);

  useEffect(() => {
    setIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isTooltipOpen) {
      setIsOpen(false);
      onClose?.();
    }
  }, [isTooltipOpen, onClose]);

  return (
    isTooltipOpen && (
      <div className={clsx(tooltip.getTooltipStyles(tipLocation), className)} style={tooltipPosition || undefined}>
        <div>
          <Text content={content} type='p' fontSize='medium' fontWeight='semibold' />
          <div className='mt-1'>{children}</div>
        </div>
        <button className='ml-2 mb-auto' onClick={handleClose}>
          <Icon name='Close' />
        </button>
      </div>
    )
  );
};

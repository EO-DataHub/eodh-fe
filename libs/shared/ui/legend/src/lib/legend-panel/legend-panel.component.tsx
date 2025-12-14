import { Icon } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';

import { ILegendPanelProps } from '../legend.types';
import { legendPanelStyles } from './legend-panel.styles';
import { useDraggable } from './use-draggable.hook';

export const LegendPanel = ({
  title,
  position,
  onPositionChange,
  isExpanded,
  onToggleExpand,
  onResetPosition,
  onClose,
  children,
  className,
  maxHeight,
}: ILegendPanelProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const { position: currentPosition, dragHandleProps } = useDraggable({
    initialPosition: position,
    onPositionChange,
    constrainToViewport: true,
    elementRef,
  });

  const handleToggleClick = useCallback(() => {
    onToggleExpand();
  }, [onToggleExpand]);

  const handleResetPositionClick = useCallback(() => {
    onResetPosition?.();
  }, [onResetPosition]);

  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <div
      ref={elementRef}
      className={clsx(legendPanelStyles.container, className)}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
      }}
    >
      <div className={legendPanelStyles.header} {...dragHandleProps}>
        <span className={legendPanelStyles.headerTitle}>{title}</span>
        <div className={legendPanelStyles.headerButtons}>
          {onResetPosition && (
            <button
              type='button'
              className={legendPanelStyles.headerButton}
              onClick={handleResetPositionClick}
              aria-label='Reset position'
            >
              <Icon name='Erase' />
            </button>
          )}
          <button
            type='button'
            className={legendPanelStyles.headerButton}
            onClick={handleToggleClick}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <Icon name={isExpanded ? 'ArrowUpward' : 'ArrowDown'} />
          </button>
          <button
            type='button'
            className={legendPanelStyles.headerButton}
            onClick={handleCloseClick}
            aria-label='Close'
          >
            <Icon name='Close' />
          </button>
        </div>
      </div>

      <div
        className={clsx(
          legendPanelStyles.content,
          legendPanelStyles.contentPadding,
          !isExpanded && legendPanelStyles.collapsed
        )}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

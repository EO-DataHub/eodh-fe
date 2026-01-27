import { Icon, twMerge } from '@ukri/shared/design-system';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ILegendPanelProps } from './legend.types';
import { legendPanelStyles } from './legend-panel.styles';
import { useDraggable } from './use-draggable.hook';

export const LegendPanel = ({
  title,
  position,
  onPositionChange,
  isExpanded,
  onToggleExpand,
  onResetPosition,
  children,
  className,
  maxHeight,
  isFocused = false,
  onMouseDown,
}: ILegendPanelProps) => {
  const { t } = useTranslation();
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

  const handleContainerMouseDown = useCallback(() => {
    onMouseDown?.();
  }, [onMouseDown]);

  return (
    <div
      ref={elementRef}
      className={twMerge(legendPanelStyles.container, isFocused && legendPanelStyles.containerFocused, className)}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        zIndex: isFocused ? 60 : 50,
      }}
      onMouseDown={handleContainerMouseDown}
    >
      <div className={legendPanelStyles.header} {...dragHandleProps}>
        <span className={legendPanelStyles.headerTitle}>{t(title)}</span>
        <div className={legendPanelStyles.headerButtons}>
          {onResetPosition && (
            <button
              type='button'
              className={legendPanelStyles.headerButton}
              onClick={handleResetPositionClick}
              aria-label='Reset position'
            >
              <Icon name='ResetFocus' />
            </button>
          )}
          <button
            type='button'
            className={legendPanelStyles.headerButton}
            onClick={handleToggleClick}
            aria-label={isExpanded ? 'CollapseContent' : 'ExpandContent'}
          >
            <Icon name={isExpanded ? 'CollapseContent' : 'ExpandContent'} />
          </button>
        </div>
      </div>

      <div
        className={twMerge(legendPanelStyles.content, !isExpanded && legendPanelStyles.collapsed)}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {children}
      </div>
    </div>
  );
};

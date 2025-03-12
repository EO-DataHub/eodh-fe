import { useComparisonMode } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { MouseEvent as ReactMouseEvent, useCallback, useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../../map.component';
import { ComparisonContext } from '../use-comparison-mode-image-layer.hook';

const defaultSliderPosition = 0.5;

interface IComparisonToolSliderProps {
  className?: string;
}

export const ComparisonToolSlider = ({ className }: IComparisonToolSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const map = useContext(MapContext);
  const { item1, item2 } = useContext(ComparisonContext);
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();

  const updateSliderPosition = useCallback(
    (newSliderPosition: number) => {
      if (!map || !map.getView() || !map.getView().getCenter() || !item1 || !item2) {
        return;
      }

      const view = map.getView();
      const mapSize = map.getSize();
      const mapExtent = view.calculateExtent(mapSize);
      const [minX, minY, maxX, maxY] = mapExtent;

      const splitX = minX + (maxX - minX) * newSliderPosition;
      item1.setExtent([minX, minY, splitX, maxY]);
      item2.setExtent([splitX, minY, maxX, maxY]);
      map.render();
    },
    [item1, item2, map]
  );

  useEffect(() => {
    let currZoom = map.getView().getZoom();
    const func = () => {
      const newZoom = map.getView().getZoom();
      if (currZoom !== newZoom) {
        currZoom = newZoom;
        updateSliderPosition(defaultSliderPosition);
      }
    };
    map.on('moveend', func);
    
    return () => {
      map.un('moveend', func);
    };
  }, [updateSliderPosition, map]);

  const updateStyles = useCallback((newSliderPosition: number) => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }
    slider.style.left = `${newSliderPosition * 100}%`;
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const rect = map.getTargetElement()?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      let newSliderPosition = (event.clientX - rect.left) / rect.width;
      newSliderPosition = Math.max(0, Math.min(1, newSliderPosition));
      updateSliderPosition(newSliderPosition);
      updateStyles(newSliderPosition);
    },
    [map, updateSliderPosition, updateStyles]
  );

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [onMouseMove, onMouseUp]
  );

  if (!comparisonModeEnabled || comparisonItems.items.length < 2) {
    return null;
  }

  return (
    <div
      ref={sliderRef}
      className={`absolute top-0 bottom-0 left-1/2 w-1 bg-bright-main cursor-ew-resize shadow-comparison-swipr-tool ${className}`}
      style={{ left: '50%' }}
      onMouseDown={onMouseDown}
    >
      <span className='rounded border-[3px] border-bright-main w-6 h-9 bg-primary-main top-1/2 absolute left-[-10px]'>
        <Icon
          name='DragIndicator'
          width={16}
          height={16}
          className='text-primary-light absolute top-[12px] left-[1px]'
        />
        <Icon name='DragIndicator' width={16} height={16} className='text-primary-light ' />
      </span>
    </div>
  );
};

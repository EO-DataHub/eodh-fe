import { useComparisonMode } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { MouseEvent as ReactMouseEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { MapContext } from '../../map.component';
import { ComparisonContext } from '../use-comparison-mode-image-layer.hook';

const defaultSliderPosition = 0.5;

interface IComparisonToolSliderProps {
  className?: string;
}

export const ComparisonToolSlider = ({ className }: IComparisonToolSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const map = useContext(MapContext);
  const [sliderPosition, setSliderPosition] = useState(defaultSliderPosition);
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();
  const { item1, item2 } = useContext(ComparisonContext);

  const updateSliderPosition = useCallback(
    (newSliderPosition: number) => {
      if (!map || !map.getView() || !map.getView().getCenter()) {
        return;
      }

      console.log('abc', map.getTargetElement());

      const view = map.getView();

      console.log('layers', item1, item2, map.getLayers().getArray());

      if (!item1 || !item2) {
        return;
      }

      const mapSize = map.getSize();
      const mapExtent = view.calculateExtent(mapSize);
      const [minX, minY, maxX, maxY] = mapExtent;

      const splitX = minX + (maxX - minX) * newSliderPosition;
      // console.log('splitX', splitX);

      console.log('item1---1', [minX, minY, splitX, maxY], item1.getExtent());
      item1.setExtent([minX, minY, splitX, maxY]);
      console.log('item1---2', item1.getExtent());
      // item2.setExtent([splitX, minY, maxX, maxY]);
    },
    [item1, item2, map]
  );

  useEffect(() => {
    updateSliderPosition(sliderPosition);
  }, [sliderPosition, updateSliderPosition]);

  useEffect(() => {
    updateSliderPosition(defaultSliderPosition);
  }, [updateSliderPosition]);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const slider = sliderRef.current;
      if (!slider) {
        return;
      }

      const rect = map.getTargetElement()?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      let newSliderPosition = (event.clientX - rect.left) / rect.width;
      newSliderPosition = Math.max(0, Math.min(1, newSliderPosition));
      slider.style.left = `${newSliderPosition * 100}%`;

      // console.log('newSliderPosition', newSliderPosition);
      setSliderPosition(newSliderPosition);
      map.render();
    },
    [map]
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

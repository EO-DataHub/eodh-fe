import { useComparisonMode } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../map.component';

interface IComparisonToolSliderProps {
  className?: string;
}

export const ComparisonToolSlider = ({ className }: IComparisonToolSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const map = useContext(MapContext);

  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    let sliderPosition = 0.5;

    const updateLayerExtents = () => {
      if (map && map.getView()) {
        const comparisonItemFirstLayer = map
          .getLayers()
          .getArray()
          .filter((layer) => layer.getProperties().comparison_id === 'comparison_item_0')[0];

        const comparisonItemSecondLayer = map
          .getLayers()
          .getArray()
          .filter((layer) => layer.getProperties().comparison_id === 'comparison_item_1')[0];
        const view = map.getView();
        if (!view.getCenter()) {
          return;
        }

        const mapSize = map.getSize();
        const mapExtent = view.calculateExtent(mapSize);
        const [minX, minY, maxX, maxY] = mapExtent;

        const splitX = minX + (maxX - minX) * sliderPosition;
        // console.log('splitX', splitX);

        // console.log('comparisonItemFirstLayer minx etc', minX, minY, splitX, maxY);
        comparisonItemFirstLayer.setExtent([minX, minY, splitX, maxY]);
        // console.log('comparisonItemFirstLayer get ', comparisonItemFirstLayer.getExtent());
        comparisonItemSecondLayer.setExtent([splitX, minY, maxX, maxY]);
        // console.log('comparisonItemSecondLayer get ', comparisonItemSecondLayer.getExtent());
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!slider) {
        return;
      }
      const rect = slider.parentElement?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      sliderPosition = (event.clientX - rect.left) / rect.width;
      sliderPosition = Math.max(0, Math.min(1, sliderPosition));
      slider.style.left = `${sliderPosition * 100}%`;
      updateLayerExtents();
      map.render();
    };

    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    slider.addEventListener('mousedown', onMouseDown);

    updateLayerExtents();

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [map]);

  if (!comparisonModeEnabled || comparisonItems.items.length < 2) {
    return null;
  }

  return (
    <div
      ref={sliderRef}
      className={`absolute top-0 bottom-0 left-1/2 w-1 bg-bright-main cursor-ew-resize shadow-comparison-swipr-tool ${className}`}
      style={{ left: '50%' }}
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

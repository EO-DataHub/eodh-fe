import { useComparisonMode } from '@ukri/map/data-access-map';
import { useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../map.component';
import { useComparisonModeImageLayers } from '../use-comparison-mode-image-layer.hook';

interface IComparisonToolSliderProps {
  className?: string;
}

export const ComparisonToolSlider = ({ className }: IComparisonToolSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const map = useContext(MapContext);
  const { stacLayers } = useComparisonModeImageLayers();
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !stacLayers || stacLayers.length < 2) {
      return;
    }

    let sliderPosition = 0.5;

    const updateLayerExtents = () => {
      if (map && map.getView()) {
        const view = map.getView();
        if (!view.getCenter() || !stacLayers[0] || !stacLayers[1]) {
          return;
        }

        const mapSize = map.getSize();
        const mapExtent = view.calculateExtent(mapSize);
        const [minX, minY, maxX, maxY] = mapExtent;

        const splitX = minX + (maxX - minX) * sliderPosition;
        console.log('splitX', splitX);
        // console.log('stacLayers', stacLayers);
        // console.log('stacLayers 0', stacLayers[0]?.setExtent([minX, minY, splitX, maxY]));

        stacLayers[0].setExtent([minX, minY, splitX, maxY]);
        console.log('stacLayers[0] get ', stacLayers[0]?.getExtent());
        stacLayers[1].setExtent([splitX, minY, maxX, maxY]);
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
  }, [stacLayers, map]);

  if (!comparisonModeEnabled || comparisonItems.items.length < 2) {
    return null;
  }

  return (
    <div
      ref={sliderRef}
      className={`absolute top-0 bottom-0 left-1/2 w-1 bg-slate-600 cursor-ew-resize z-50 ${className}`}
      style={{ left: '50%' }}
    />
  );
};

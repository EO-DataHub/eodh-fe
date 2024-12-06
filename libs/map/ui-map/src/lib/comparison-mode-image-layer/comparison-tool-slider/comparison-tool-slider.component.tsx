import { useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../map.component';
import { useComparisonModeImageLayers } from '../use-comparison-mode-image-layer.hook';

export const ComparisonToolSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const map = useContext(MapContext);
  const { stacLayers } = useComparisonModeImageLayers();

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || !stacLayers || stacLayers.length < 2) {
      return;
    }

    let sliderPosition = 0.5;

    const updateLayerExtents = () => {
      if (map && map.getView()) {
        const view = map.getView();
        if (!view.getCenter()) {
          return;
        }

        const mapSize = map.getSize();
        const mapExtent = view.calculateExtent(mapSize);
        const [minX, minY, maxX, maxY] = mapExtent;

        const splitX = minX + (maxX - minX) * sliderPosition;

        stacLayers[0]?.setExtent([minX, minY, splitX, maxY]);
        stacLayers[1]?.setExtent([splitX, minY, maxX, maxY]);
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

  return (
    <div
      ref={sliderRef}
      className='absolute top-0 bottom-0 left-1/2 w-1 bg-slate-600 cursor-ew-resize z-50'
      style={{ left: '50%' }}
    />
  );
};

// import React, { useCallback, useContext, useEffect, useState } from 'react';

// import { MapContext } from '../../map.component';
// import { useComparisonModeImageLayers } from '../use-comparison-mode-image-layer.hook';

// export const ComparisonToolSlider: React.FC = () => {
//   const map = useContext(MapContext);
//   const { stacLayers } = useComparisonModeImageLayers();
//   const [sliderPosition, setSliderPosition] = useState(0.5);

//   const updateLayerExtents = useCallback(() => {
//     if (!map || stacLayers.length < 2) {
//       return;
//     }

//     const mapSize = map.getSize();
//     const mapExtent = map.getView().calculateExtent(mapSize);
//     const [minX, minY, maxX, maxY] = mapExtent;

//     const splitX = minX + (maxX - minX) * sliderPosition;

//     stacLayers[0]?.setExtent([minX, minY, splitX, maxY]);
//     stacLayers[1]?.setExtent([splitX, minY, maxX, maxY]);
//     map.render();
//   }, [map, stacLayers, sliderPosition]);

//   useEffect(() => {
//     updateLayerExtents();
//   }, [updateLayerExtents]);

//   const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = (event.target as HTMLElement).parentElement?.getBoundingClientRect();
//       if (!rect) {
//         return;
//       }

//       let newPosition = (e.clientX - rect.left) / rect.width;
//       newPosition = Math.max(0, Math.min(1, newPosition));
//       setSliderPosition(newPosition);
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseup', handleMouseUp);
//   }, []);

//   return (
//     <div
//       onMouseDown={handleMouseDown}
//       className='absolute top-0 bottom-0 w-1 bg-slate-600 cursor-ew-resize z-50'
//       style={{ left: `${sliderPosition * 100}%` }}
//     />
//   );
// };

// import { MapContext } from '@ukri/map/ui-map';
// import { useCallback, useContext, useEffect, useState } from 'react';

// export const useSlider = () => {
//   const map = useContext(MapContext);
//   const [sliderPosition, setSliderPosition] = useState(0.5);

//   const updateLayerExtents = useCallback(() => {
//     if (!map) {
//       return;
//     }

//     const mapSize = map.getSize();
//     const mapExtent = map.getView().calculateExtent(mapSize);
//     const [minX, minY, maxX, maxY] = mapExtent;
//     const splitX = minX + (maxX - minX) * sliderPosition;

//     const layers = map.getLayers().getArray();
//     if (layers.length >= 3) {
//       const layer1 = layers[1];
//       const layer2 = layers[2];
//       layer1.setExtent([minX, minY, splitX, maxY]);
//       layer2.setExtent([splitX, minY, maxX, maxY]);
//     }

//     map.render();
//   }, [map, sliderPosition]);

//   useEffect(() => {
//     updateLayerExtents();
//   }, [updateLayerExtents]);

//   const handleMouseDown = useCallback(
//     (e: React.MouseEvent) => {
//       e.preventDefault();
//       const handleMouseMove = (e: MouseEvent) => {
//         if (!map) {
//           return;
//         }
//         const mapElement = map.getTargetElement();
//         const rect = mapElement.getBoundingClientRect();
//         let newPosition = (e.clientX - rect.left) / rect.width;
//         newPosition = Math.max(0, Math.min(newPosition, 1));
//         setSliderPosition(newPosition);
//       };

//       const handleMouseUp = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };

//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     },
//     [map]
//   );

//   return { sliderPosition, handleMouseDown };
// };

import { Extent } from 'ol/extent';
import { Layer } from 'ol/layer';
import { Size } from 'ol/size';
import { useCallback, useContext, useEffect, useState } from 'react';

import { MapContext } from '../../map.component';

export const useSlider = () => {
  const map = useContext(MapContext);
  const [sliderPosition, setSliderPosition] = useState<number>(0.5);

  const updateLayerExtents = useCallback(() => {
    if (!map) {
      return;
    }

    const mapSize: Size | undefined = map.getSize();
    if (!mapSize) {
      return;
    }

    const mapExtent: Extent = map.getView().calculateExtent(mapSize);
    const [minX, minY, maxX, maxY] = mapExtent;
    const splitX: number = minX + (maxX - minX) * sliderPosition;

    const layers = map.getLayers().getArray();
    if (layers.length >= 3) {
      const layer1 = layers[1] as Layer;
      const layer2 = layers[2] as Layer;

      if ('setExtent' in layer1 && typeof layer1.setExtent === 'function') {
        layer1.setExtent([minX, minY, splitX, maxY]);
      }
      if ('setExtent' in layer2 && typeof layer2.setExtent === 'function') {
        layer2.setExtent([splitX, minY, maxX, maxY]);
      }
    }

    map.render();
  }, [map, sliderPosition]);

  useEffect(() => {
    updateLayerExtents();
  }, [updateLayerExtents]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const handleMouseMove = (e: MouseEvent) => {
        if (!map) {
          return;
        }
        const mapElement = map.getTargetElement();
        if (!mapElement) {
          return;
        }
        const rect = mapElement.getBoundingClientRect();
        let newPosition = (e.clientX - rect.left) / rect.width;
        newPosition = Math.max(0, Math.min(newPosition, 1));
        setSliderPosition(newPosition);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [map]
  );

  return { sliderPosition, handleMouseDown };
};

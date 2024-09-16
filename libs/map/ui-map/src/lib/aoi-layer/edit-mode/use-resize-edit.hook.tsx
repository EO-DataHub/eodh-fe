import { useAoiMode } from '@ukri/map/data-access-map';
import { always } from 'ol/events/condition';
import Transform from 'ol-ext/interaction/Transform';
import { useContext, useEffect } from 'react';

import { MapContext } from '../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';

export const useResizeEdit = (enabled: boolean) => {
  const map = useContext(MapContext);
  const { layer } = useContext(AoiLayerContext);
  const mode = useAoiMode();

  useEffect(() => {
    if (!enabled || !layer || mode !== 'search') {
      return;
    }

    const transform = new Transform({
      enableRotatedTransform: false,
      addCondition: always,
      layers: [layer],
      hitTolerance: 2,
      scale: true,
      rotate: false,
      keepAspectRatio: always,
      keepRectangle: true,
      pointRadius: (feature) => {
        const radius = feature.get('radius') || 10;
        return [radius, radius];
      },
    });

    map.addInteraction(transform);

    return () => {
      map.removeInteraction(transform);
    };
  }, [enabled, map, layer, mode]);
};

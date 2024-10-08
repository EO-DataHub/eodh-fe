import { useAoi } from '@ukri/map/data-access-map';
import { Modify } from 'ol/interaction.js';
import { useContext, useEffect } from 'react';

import { MapContext } from '../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';

export const useSimpleEdit = (enabled: boolean) => {
  const { source, layer, draw } = useContext(AoiLayerContext);
  const map = useContext(MapContext);
  const { state, setShape } = useAoi();

  useEffect(() => {
    if (!enabled || !source || !layer || state !== 'edit') {
      return;
    }

    const modify = new Modify({ source });
    modify.on('modifyend', (event) => {
      if (!draw) {
        return;
      }

      setShape({ type: draw.type, shape: event.features.pop()?.getGeometry() });
    });

    map.addInteraction(modify);

    return () => {
      map.removeInteraction(modify);
    };
  }, [enabled, map, state, source, layer, draw, setShape]);
};

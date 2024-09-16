import { useAoiMode, useCurrentAoiMutation } from '@ukri/map/data-access-map';
import { Modify } from 'ol/interaction.js';
import { useContext, useEffect } from 'react';

import { MapContext } from '../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';

export const useSimpleEdit = (enabled: boolean) => {
  const { source, layer } = useContext(AoiLayerContext);
  const map = useContext(MapContext);
  const mode = useAoiMode();
  const setShape = useCurrentAoiMutation();

  useEffect(() => {
    if (!enabled || !source || !layer || mode !== 'search') {
      return;
    }

    const modify = new Modify({ source });
    modify.on('modifyend', (event) => setShape(event.features.pop()?.getGeometry()));

    map.addInteraction(modify);

    return () => {
      map.removeInteraction(modify);
    };
  }, [enabled, map, mode, source, layer, setShape]);
};

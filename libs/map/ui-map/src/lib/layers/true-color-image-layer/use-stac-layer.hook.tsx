import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import STAC from 'ol-stac';
import { useEffect } from 'react';

import { stacLayerZindex } from '../../consts';
import { STACWithColorMap } from '../../stac/stac-with-color-map';
import { useStacLayerCreation } from '../../stac/use-stac-layer-creation';

export const useStacLayer = () => {
  const { stacUrl } = useTrueColorImage();
  const { comparisonModeEnabled } = useComparisonMode();
  const { mode } = useMode();

  const { createStacLayer, removeLayerFromMap, addLayerToMap } = useStacLayerCreation();

  useEffect(() => {
    if (!stacUrl || comparisonModeEnabled) {
      return;
    }

    let newStacLayer: STAC | STACWithColorMap | null = null;

    const loadLayer = async () => {
      const authorized = mode !== 'search';
      newStacLayer = await createStacLayer({ url: stacUrl, zIndex: stacLayerZindex, authorized });

      if (newStacLayer) {
        addLayerToMap(newStacLayer);
      }
    };

    loadLayer();

    return () => {
      if (newStacLayer) {
        removeLayerFromMap(newStacLayer);
      }
    };
  }, [stacUrl, mode, comparisonModeEnabled, createStacLayer, removeLayerFromMap, addLayerToMap]);
};

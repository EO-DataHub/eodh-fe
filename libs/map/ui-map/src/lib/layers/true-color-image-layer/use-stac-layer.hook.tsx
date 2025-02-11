import { useComparisonMode, useTrueColorImage } from '@ukri/map/data-access-map';
import STAC from 'ol-stac';
import { useEffect } from 'react';

import { stacLayerZindex } from '../../consts';
import { STACWithColorMap } from '../../stac/stac-with-color-map';
import { useStacLayerCreation } from '../../stac/use-stac-layer-creation';

export const useStacLayer = () => {
  const { stacUrl, feature } = useTrueColorImage();
  const { comparisonModeEnabled } = useComparisonMode();

  const { createStacLayer, removeLayerFromMap, addLayerToMap } = useStacLayerCreation();

  useEffect(() => {
    if (!stacUrl || comparisonModeEnabled) {
      return;
    }

    let newStacLayer: STAC | STACWithColorMap | null = null;

    const loadLayer = async () => {
      newStacLayer = await createStacLayer({ url: stacUrl, zIndex: stacLayerZindex, collection: feature?.collection });

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
  }, [stacUrl, comparisonModeEnabled, feature, createStacLayer, removeLayerFromMap, addLayerToMap]);
};

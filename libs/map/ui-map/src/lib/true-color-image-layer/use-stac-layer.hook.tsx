import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { STACWithColorMap } from '../stac/stac-with-color-map';
import { useStacLayerCreation } from '../use-stac-layer-creation/use-stac-layer-creation';

register(proj4);

export const useStacLayer = () => {
  const { stacUrl } = useTrueColorImage();
  const { comparisonModeEnabled } = useComparisonMode();
  const [stacLayer, setStacLayer] = useState<STAC | STACWithColorMap | null>(null);
  const { mode } = useMode();

  const { createPublicStacLayer, createPrivateStacLayer, addLayerToMap, removeLayerFromMap } = useStacLayerCreation();

  useEffect(() => {
    if (!stacUrl || comparisonModeEnabled) {
      return;
    }

    let newStacLayer: STAC | STACWithColorMap | null = null;

    const loadLayer = async () => {
      if (mode === 'search') {
        newStacLayer = createPublicStacLayer(stacUrl, stacLayerZindex);
      } else {
        newStacLayer = await createPrivateStacLayer(stacUrl, stacLayerZindex);
      }

      if (newStacLayer) {
        addLayerToMap(newStacLayer);
        setStacLayer(newStacLayer);
      }
    };

    loadLayer();

    return () => {
      if (newStacLayer) {
        removeLayerFromMap(newStacLayer);
      }
    };
  }, [
    stacUrl,
    mode,
    comparisonModeEnabled,
    createPublicStacLayer,
    createPrivateStacLayer,
    addLayerToMap,
    removeLayerFromMap,
  ]);

  const updateZindex = useCallback(
    (newZIndex: number) => {
      if (stacLayer) {
        stacLayer.setZIndex(newZIndex);
      }
    },
    [stacLayer]
  );

  const toggleVisibility = useCallback(() => {
    if (stacLayer) {
      const isVisible = stacLayer?.getVisible();
      stacLayer.setVisible(!isVisible);
    }
  }, [stacLayer]);

  return { updateZindex, toggleVisibility };
};

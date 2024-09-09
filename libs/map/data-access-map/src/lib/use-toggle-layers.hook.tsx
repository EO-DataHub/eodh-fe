import { useCallback, useMemo } from 'react';

import { useAoiLayerVisible, useToggleAoiLayer } from './aoi.store';
import { useFootprintLayerVisible, useToggleFootprintLayer } from './footprint.store';

export const useLayers = () => {
  const isAoiLayerVisible = useAoiLayerVisible();
  const isFootprintLayerVisible = useFootprintLayerVisible();
  const toggleAoiLayer = useToggleAoiLayer();
  const toggleFootprintLayer = useToggleFootprintLayer();

  const toggle = useCallback(() => {
    toggleAoiLayer();
    toggleFootprintLayer();
  }, [toggleAoiLayer, toggleFootprintLayer]);

  return useMemo(
    () => ({
      visible: isAoiLayerVisible && isFootprintLayerVisible,
      toggle,
    }),
    [isAoiLayerVisible, isFootprintLayerVisible, toggle]
  );
};

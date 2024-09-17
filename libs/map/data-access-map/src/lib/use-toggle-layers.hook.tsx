import { useCallback, useMemo } from 'react';

import { useAoiLayerVisible, useChangeAoiLayerVisibility, useCurrentAoi } from './aoi.store';
import { useFootprintCollection, useFootprintLayerVisible, useToggleFootprintLayer } from './footprint.store';

export const useLayers = () => {
  const currentShape = useCurrentAoi();
  const footprintCollection = useFootprintCollection();
  const isAoiLayerVisible = useAoiLayerVisible();
  const isFootprintLayerVisible = useFootprintLayerVisible();
  const { toggle: toggleAoiLayer } = useChangeAoiLayerVisibility();
  const { toggle: toggleFootprintLayer } = useToggleFootprintLayer();

  const toggle = useCallback(() => {
    toggleAoiLayer();
    toggleFootprintLayer();
  }, [toggleAoiLayer, toggleFootprintLayer]);

  return useMemo(
    () => ({
      visible: isAoiLayerVisible && isFootprintLayerVisible,
      enabled: !!footprintCollection || !!currentShape,
      toggle,
    }),
    [currentShape, footprintCollection, isAoiLayerVisible, isFootprintLayerVisible, toggle]
  );
};

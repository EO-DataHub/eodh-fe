import { useCallback, useMemo } from 'react';

import { useAoi } from './aoi-store/aoi.store';
import {
  useFootprintCollection,
  useFootprintLayerVisible,
  useToggleFootprintLayer,
} from './footprint-store/footprint.store';

export const useLayers = () => {
  const { shape, visible: isAoiLayerVisible, toggleVisibility: toggleAoiLayer } = useAoi();
  const footprintCollection = useFootprintCollection();
  const isFootprintLayerVisible = useFootprintLayerVisible();
  const { toggle: toggleFootprintLayer } = useToggleFootprintLayer();

  const toggle = useCallback(() => {
    toggleAoiLayer();
    toggleFootprintLayer();
  }, [toggleAoiLayer, toggleFootprintLayer]);

  return useMemo(
    () => ({
      visible: isAoiLayerVisible && isFootprintLayerVisible,
      enabled: !!footprintCollection || !!shape,
      toggle,
    }),
    [shape, footprintCollection, isAoiLayerVisible, isFootprintLayerVisible, toggle]
  );
};

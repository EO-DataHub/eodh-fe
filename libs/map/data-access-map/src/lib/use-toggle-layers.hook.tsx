import { useCallback, useEffect, useMemo } from 'react';

import { useAoiLayerVisible, useAoiMode, useChangeAoiLayerVisibility } from './aoi.store';
import { useFootprintLayerVisible, useToggleFootprintLayer } from './footprint.store';

export const useLayers = () => {
  const isAoiLayerVisible = useAoiLayerVisible();
  const isFootprintLayerVisible = useFootprintLayerVisible();
  const { show: showAoiLayer, toggle: toggleAoiLayer } = useChangeAoiLayerVisibility();
  const {
    hide: hideFootprintLayer,
    show: showFootprintLayer,
    toggle: toggleFootprintLayer,
  } = useToggleFootprintLayer();
  const aoiMode = useAoiMode();

  const toggle = useCallback(() => {
    toggleAoiLayer();
    toggleFootprintLayer();
  }, [toggleAoiLayer, toggleFootprintLayer]);

  useEffect(() => {
    if (aoiMode === 'search') {
      showAoiLayer();
      hideFootprintLayer();
    } else if (aoiMode === 'view') {
      showAoiLayer();
      showFootprintLayer();
    }
  }, [aoiMode, hideFootprintLayer, showAoiLayer, showFootprintLayer]);

  return useMemo(
    () => ({
      visible: isAoiLayerVisible && isFootprintLayerVisible,
      toggle,
    }),
    [isAoiLayerVisible, isFootprintLayerVisible, toggle]
  );
};

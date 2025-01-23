import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, selectedKey, setFeature } = useTrueColorImage();
  const { mode } = useMode();
  const { comparisonModeEnabled, itemAddedToComparisonMode, canAddAsNewItemToComparisonMode, toggleCompareItem } =
    useComparisonMode();

  const isSelected = useCallback((id: string) => visibleFeature?.id === id, [visibleFeature]);

  const isAddedToComparison = useCallback(
    (item: TFeature) => itemAddedToComparisonMode(item),
    [itemAddedToComparisonMode]
  );

  const canCompare = useCallback(
    (item: TFeature) => canAddAsNewItemToComparisonMode(item),
    [canAddAsNewItemToComparisonMode]
  );

  const download = useCallback((feature: TFeature) => {
    downloadFiles(feature);
  }, []);

  const handleSelectedItemToggle = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      if (key) {
        const newFeature = visibleFeature?.id !== item.id && selectedKey !== key ? item : undefined;
        setFeature(newFeature, key);
      }
      const newFeature = visibleFeature?.id !== item.id ? item : undefined;
      setFeature(newFeature);
    },
    [setFeature, visibleFeature, selectedKey]
  );

  const handleToggleCompareItem = useCallback(
    (item: TFeature) => {
      toggleCompareItem(item, mode);
    },
    [mode, toggleCompareItem]
  );

  return useMemo(
    () => ({
      toggleItem: handleSelectedItemToggle,
      toggleCompareItem: handleToggleCompareItem,
      downloadItem: download,
      isSelected,
      comparisonEnabled: comparisonModeEnabled,
      isItemAddedToComparisonMode: isAddedToComparison,
      canCompareItems: canCompare,
    }),
    [
      canCompare,
      comparisonModeEnabled,
      download,
      handleSelectedItemToggle,
      isAddedToComparison,
      isSelected,
      handleToggleCompareItem,
    ]
  );
};

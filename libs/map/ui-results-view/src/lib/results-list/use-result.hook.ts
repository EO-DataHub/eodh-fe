import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, visibleKey, setFeature } = useTrueColorImage();
  const { mode } = useMode();
  const { comparisonModeEnabled, itemAddedToComparisonMode, canAddAsNewItemToComparisonMode, toggleCompareItem } =
    useComparisonMode();

  const isSelected = useCallback((id: string) => visibleFeature?.id === id, [visibleFeature]);
  const isSelectedMultipleIndices = useCallback(
    (id: string, key: TAssetKey) => visibleFeature?.id === id && visibleKey === key,
    [visibleFeature, visibleKey]
  );

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
        const newFeature = visibleFeature?.id !== item.id && visibleKey !== key ? item : undefined;
        newFeature ? setFeature(newFeature, key) : setFeature(undefined);
      } else {
        const newFeature = visibleFeature?.id !== item.id ? item : undefined;
        setFeature(newFeature);
      }
    },
    [setFeature, visibleFeature, visibleKey]
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
      isSelectedMultipleIndices,
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
      isSelectedMultipleIndices,
      handleToggleCompareItem,
    ]
  );
};

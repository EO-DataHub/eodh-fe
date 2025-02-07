import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetKey, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, visibleKey, setFeature } = useTrueColorImage();
  const { mode } = useMode();
  const {
    comparisonModeEnabled,
    itemAddedToComparisonMode,
    canAddAsNewItemToComparisonMode,
    toggleCompareItem,
    comparisonItems,
  } = useComparisonMode();

  const isSelected = useCallback((id: string) => visibleFeature?.id === id, [visibleFeature]);
  const isSelectedMultipleIndices = useCallback(
    (id: string, key: TAssetKey) => visibleFeature?.id === id && visibleKey === key,
    [visibleFeature, visibleKey]
  );

  const isAddedToComparison = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      // console.log('isAddedToComparison itemAddedToComparisonMode(item, key)', itemAddedToComparisonMode(item, key));
      return itemAddedToComparisonMode(item, key);
    },
    [itemAddedToComparisonMode]
  );

  const canCompare = useCallback(
    (item: TFeature, key?: TAssetKey) => canAddAsNewItemToComparisonMode(item, key),
    [canAddAsNewItemToComparisonMode]
  );

  const download = useCallback((feature: TFeature) => {
    downloadFiles(feature);
  }, []);

  const handleSelectedItemToggle = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      if (key) {
        const newFeature = visibleFeature?.id === item.id && visibleKey === key ? undefined : item;
        newFeature ? setFeature(newFeature, key) : setFeature(undefined);
      } else {
        const newFeature = visibleFeature?.id !== item.id ? item : undefined;
        setFeature(newFeature);
      }
    },
    [setFeature, visibleFeature, visibleKey]
  );

  const handleToggleCompareItem = useCallback(
    (item: TFeature, key?: TAssetKey) => {
      toggleCompareItem(item, mode, key);
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
      comparisonItems,
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
      comparisonItems,
    ]
  );
};

import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetName, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, assetNamesWhichShouldBeDisplayed, setFeature } = useTrueColorImage();
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
    (id: string, key: TAssetName) => visibleFeature?.id === id && assetNamesWhichShouldBeDisplayed === key,
    [visibleFeature, assetNamesWhichShouldBeDisplayed]
  );

  const isAddedToComparison = useCallback(
    (item: TFeature, key?: TAssetName) => {
      return itemAddedToComparisonMode(item, key);
    },
    [itemAddedToComparisonMode]
  );

  const canCompare = useCallback(
    (item: TFeature, key?: TAssetName) => canAddAsNewItemToComparisonMode(item, key),
    [canAddAsNewItemToComparisonMode]
  );

  const download = useCallback((feature: TFeature) => {
    downloadFiles(feature);
  }, []);

  const handleSelectedItemToggle = useCallback(
    (item: TFeature, key?: TAssetName) => {
      if (key) {
        const newFeature =
          visibleFeature?.id === item.id && assetNamesWhichShouldBeDisplayed === key ? undefined : item;
        newFeature ? setFeature(newFeature, key) : setFeature(undefined);
      } else {
        const newFeature = visibleFeature?.id !== item.id ? item : undefined;
        setFeature(newFeature);
      }
    },
    [setFeature, visibleFeature, assetNamesWhichShouldBeDisplayed]
  );

  const handleToggleCompareItem = useCallback(
    (item: TFeature, key?: TAssetName) => {
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

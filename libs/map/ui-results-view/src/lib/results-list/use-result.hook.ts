import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetName, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, assetNameWhichShouldBeDisplayed, setFeature } = useTrueColorImage();
  const { mode } = useMode();
  const { comparisonModeEnabled, itemAddedToComparisonMode, canAddAsNewItemToComparisonMode, toggleCompareItem } =
    useComparisonMode();

  const isSelected = useCallback((id: string) => visibleFeature?.id === id, [visibleFeature]);
  const isSelectedMultipleIndices = useCallback(
    (id: string, key: TAssetName) => visibleFeature?.id === id && assetNameWhichShouldBeDisplayed === key,
    [visibleFeature, assetNameWhichShouldBeDisplayed]
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
      const getFeature = () => {
        if (key) {
          return visibleFeature?.id === item.id && assetNameWhichShouldBeDisplayed === key ? undefined : item;
        }

        return visibleFeature?.id !== item.id ? item : undefined;
      };

      setFeature(getFeature(), key);
    },
    [setFeature, visibleFeature, assetNameWhichShouldBeDisplayed]
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
      itemAddedToComparisonMode,
      canCompareItems: canCompare,
    }),
    [
      canCompare,
      comparisonModeEnabled,
      download,
      handleSelectedItemToggle,
      isSelected,
      isSelectedMultipleIndices,
      handleToggleCompareItem,
      itemAddedToComparisonMode,
    ]
  );
};

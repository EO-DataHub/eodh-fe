import { useComparisonMode, useFootprints, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetName, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, assetNameWhichShouldBeDisplayed, setFeature } = useTrueColorImage();
  const { highlightedItem, setHighlightedItem } = useFootprints();
  const { mode } = useMode();
  const {
    comparisonModeEnabled,
    itemAddedToComparisonMode,
    canAddAsNewItemToComparisonMode,
    toggleCompareItem,
    countItemsAddedToComparisonMode,
  } = useComparisonMode();

  const isSelected = useCallback(
    (id: string, assetName?: TAssetName) => {
      if (id === highlightedItem?.featureId) {
        return true;
      }

      if (assetName) {
        return visibleFeature?.id === id && assetName === assetNameWhichShouldBeDisplayed;
      }

      return visibleFeature?.id === id;
    },
    [visibleFeature, assetNameWhichShouldBeDisplayed, highlightedItem]
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
      setHighlightedItem(undefined);
    },
    [visibleFeature, assetNameWhichShouldBeDisplayed, setFeature, setHighlightedItem]
  );

  const handleToggleCompareItem = useCallback(
    (item: TFeature, key?: TAssetName) => {
      toggleCompareItem(item, mode, key);
    },
    [mode, toggleCompareItem]
  );

  const highlightFeature = useCallback(
    (feature?: TFeature) => {
      if (feature) {
        setHighlightedItem({ featureId: feature.id, eventSource: 'results-list', eventType: 'pointermove' });
      } else {
        setHighlightedItem(undefined);
      }
    },
    [setHighlightedItem]
  );

  return useMemo(
    () => ({
      mode,
      toggleItem: handleSelectedItemToggle,
      highlightedItem,
      highlightItem: highlightFeature,
      toggleCompareItem: handleToggleCompareItem,
      downloadItem: download,
      isSelected,
      comparisonEnabled: comparisonModeEnabled,
      itemAddedToComparisonMode,
      canCompareItems: canCompare,
      countItemsAddedToComparisonMode,
      assetNameWhichShouldBeDisplayed,
    }),
    [
      mode,
      handleSelectedItemToggle,
      highlightedItem,
      highlightFeature,
      handleToggleCompareItem,
      download,
      isSelected,
      comparisonModeEnabled,
      canCompare,
      itemAddedToComparisonMode,
      countItemsAddedToComparisonMode,
      assetNameWhichShouldBeDisplayed,
    ]
  );
};

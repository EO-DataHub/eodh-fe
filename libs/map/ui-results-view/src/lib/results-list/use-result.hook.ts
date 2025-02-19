import { useComparisonMode, useFootprints, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TAssetName, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: visibleFeature, assetNameWhichShouldBeDisplayed, setFeature } = useTrueColorImage();
  const { highlightedItems, highlightItem, clearHighlight } = useFootprints();
  const { mode } = useMode();
  const {
    comparisonModeEnabled,
    itemAddedToComparisonMode,
    canAddAsNewItemToComparisonMode,
    toggleCompareItem,
    countItemsAddedToComparisonMode,
  } = useComparisonMode();
  const highlightedItem = useMemo(
    () => highlightedItems.find((item) => item.eventType === 'click'),
    [highlightedItems]
  );

  const isSelected = useCallback(
    (id: string, assetName?: TAssetName) => {
      if (assetName) {
        return visibleFeature?.id === id && assetName === assetNameWhichShouldBeDisplayed;
      }

      return visibleFeature?.id === id;
    },
    [visibleFeature, assetNameWhichShouldBeDisplayed]
  );

  const isHighlighted = useCallback(
    (id: string) => {
      return !!highlightedItems.find((item) => item.featureId === id);
    },
    [highlightedItems]
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
      const feature = getFeature();

      setFeature(feature, key);

      if (feature) {
        clearHighlight();
      }
    },
    [visibleFeature, assetNameWhichShouldBeDisplayed, setFeature, clearHighlight]
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
        highlightItem({ featureId: feature.id, eventSource: 'results-list', eventType: 'pointermove' });
      } else {
        highlightItem(undefined);
      }
    },
    [highlightItem]
  );

  return useMemo(
    () => ({
      mode,
      toggleItem: handleSelectedItemToggle,
      highlightedItem,
      highlightItem: highlightFeature,
      toggleCompareItem: handleToggleCompareItem,
      downloadItem: download,
      isHighlighted,
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
      isHighlighted,
      isSelected,
      comparisonModeEnabled,
      canCompare,
      itemAddedToComparisonMode,
      countItemsAddedToComparisonMode,
      assetNameWhichShouldBeDisplayed,
    ]
  );
};

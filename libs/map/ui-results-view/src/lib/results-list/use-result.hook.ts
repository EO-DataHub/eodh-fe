import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useMemo } from 'react';

import { downloadFiles } from './download-files.utils';

export const useResult = () => {
  const { feature: selectedFeature, setFeature } = useTrueColorImage();
  const { mode } = useMode();
  const { comparisonModeEnabled, itemAddedToComparisonMode, canAddAsNewItemToComparisonMode, toggleCompareItem } =
    useComparisonMode();

  const isSelected = useCallback((id: string) => selectedFeature?.id === id, [selectedFeature?.id]);

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
    (item: TFeature) => {
      const newFeature = selectedFeature?.id !== item.id ? item : undefined;
      setFeature(newFeature);
    },
    [selectedFeature, setFeature]
  );

  const unToggleSelectedItem = useCallback(() => {
    setFeature(undefined);
  }, [setFeature]);

  const handleToggleCompareItem = useCallback(
    (item: TFeature) => {
      toggleCompareItem(item, mode);
    },
    [mode, toggleCompareItem]
  );

  return useMemo(
    () => ({
      toggleItem: handleSelectedItemToggle,
      untoggleItem: unToggleSelectedItem,
      toggleCompareItem: handleToggleCompareItem,
      downloadItem: download,
      isSelected,
      comparisonEnabled: comparisonModeEnabled,
      isItemAddedToComparisonMode: isAddedToComparison,
      canCompareItems: canCompare,
    }),
    [
      handleSelectedItemToggle,
      unToggleSelectedItem,
      handleToggleCompareItem,
      download,
      isSelected,
      comparisonModeEnabled,
      isAddedToComparison,
      canCompare,
    ]
  );
};

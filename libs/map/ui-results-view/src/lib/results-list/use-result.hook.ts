import { useComparisonMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { saveAs } from 'file-saver';
import { useCallback, useMemo } from 'react';

const s3ProtocolPrefix = 's3:/';

const downloadAsset = (assets: TFeature['assets'][string][]) => {
  const files = [...assets];
  const asset = files.pop();

  if (!asset || asset.href.startsWith(s3ProtocolPrefix)) {
    return;
  }

  const link = document.createElement('a');
  link.href = asset.href;
  link.download = asset.href.split('/').pop() || 'download';
  link.click();

  if (files.length) {
    setTimeout(() => {
      downloadAsset(files);
    }, 1000);
  }
};

const downloadAssets = (assets: TFeature['assets'][string][]) => {
  assets.forEach((asset) => {
    if (!asset || asset.href.startsWith(s3ProtocolPrefix)) {
      return;
    }

    saveAs(asset.href, asset.href.split('/').pop() || 'download');
  });
};

export const useResult = () => {
  const { feature: selectedFeature, setFeature } = useTrueColorImage();
  const { comparisonModeEnabled, itemAddedToComparisonMode, canAddAsNewItemToComparisonMode, toggleCompareItem } =
    useComparisonMode();

  const isSelected = useCallback((id: string) => selectedFeature?.id === id, [selectedFeature?.id]);

  const isAddedToComparison = useCallback((id: string) => itemAddedToComparisonMode(id), [itemAddedToComparisonMode]);

  const canCompare = useCallback(
    (id: string) => canAddAsNewItemToComparisonMode(id),
    [canAddAsNewItemToComparisonMode]
  );

  const download = useCallback((feature: TFeature) => {
    const fileName = Object.values(feature.assets).pop()?.href.split('/').pop()?.split('.').shift();
    const blob = new Blob([JSON.stringify(feature)], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `${fileName || 'downloaded-file'}.json`);
    downloadAssets(Object.values(feature.assets));
    // downloadAsset(Object.values(feature.assets));
  }, []);

  const handleSelectedItemToggle = useCallback(
    (feature: TFeature) => {
      const newFeature = selectedFeature?.id !== feature.id ? feature : undefined;
      setFeature(newFeature);
    },
    [selectedFeature, setFeature]
  );

  return useMemo(
    () => ({
      toggleItem: handleSelectedItemToggle,
      toggleCompareItem,
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
      toggleCompareItem,
    ]
  );
};

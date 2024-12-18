import { useComparisonMode, useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { createDate, createDateString } from '@ukri/shared/utils/date';
import { saveAs } from 'file-saver';
import { useCallback, useMemo } from 'react';

const s3ProtocolPrefix = 's3:/';
const separator = '___';

const getFileName = (fileName: string, ext: string | undefined, dateTime: string) => {
  const date = createDate(createDateString(dateTime));
  ext = ext ? `.${ext}` : '';

  if (date) {
    return `${fileName}${separator}${date.getTime()}${ext}`;
  }

  return `${fileName}${ext}`;
};

const downloadAssets = (feature: TFeature) => {
  Object.entries(feature.assets).forEach(([key, asset]) => {
    if (!asset || asset.href.startsWith(s3ProtocolPrefix)) {
      return;
    }

    const defaultFileName = 'download';
    const fileName = `${feature.id}${separator}${key}`;
    const ext = asset.href.split('/').pop()?.split('.').pop();

    saveAs(asset.href, getFileName(fileName || defaultFileName, ext, feature.properties.datetime));
  });
};

const downloadMetadata = (feature: TFeature) => {
  const blob = new Blob([JSON.stringify(feature)], { type: 'text/plain;charset=utf-8' });
  const fileName = `${feature.id}${separator}metadata`;
  const ext = 'json';

  saveAs(blob, getFileName(fileName, ext, feature.properties.datetime));
};

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
    downloadMetadata(feature);
    downloadAssets(feature);
  }, []);

  const handleSelectedItemToggle = useCallback(
    (item: TFeature) => {
      const newFeature = selectedFeature?.id !== item.id ? item : undefined;
      setFeature(newFeature);
    },
    [selectedFeature, setFeature]
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

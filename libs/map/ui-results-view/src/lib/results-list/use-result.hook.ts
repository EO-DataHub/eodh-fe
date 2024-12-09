import { useComparisonMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { createDateString, formatDate } from '@ukri/shared/utils/date';
import { saveAs } from 'file-saver';
import { useCallback, useMemo } from 'react';

const s3ProtocolPrefix = 's3:/';

const getFileName = (fileName: string, ext: string | undefined, dateTime: string) => {
  const formattedDate = formatDate(createDateString(dateTime));
  ext = ext ? `.${ext}` : '';

  return `${fileName}-${formattedDate}${ext}`;
};

const downloadAssets = (feature: TFeature) => {
  Object.values(feature.assets).forEach((asset) => {
    if (!asset || asset.href.startsWith(s3ProtocolPrefix)) {
      return;
    }

    const defaultFileName = 'download';
    const fullFileName = asset.href.split('/').pop() || '';
    const fileName = fullFileName.split('.').shift();
    const ext = fullFileName.split('.').pop();

    saveAs(asset.href, getFileName(fileName || defaultFileName, ext, feature.properties.datetime));
  });
};

const downloadMetadata = (feature: TFeature) => {
  const blob = new Blob([JSON.stringify(feature)], { type: 'text/plain;charset=utf-8' });
  const defaultFileName = 'downloaded-file';
  const fullFileName = Object.values(feature.assets).pop()?.href.split('/').pop() || '';
  const fileName = fullFileName.split('.').shift();
  const ext = '.json';

  saveAs(blob, getFileName(fileName || defaultFileName, ext, feature.properties.datetime));
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
    downloadMetadata(feature);
    downloadAssets(feature);
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

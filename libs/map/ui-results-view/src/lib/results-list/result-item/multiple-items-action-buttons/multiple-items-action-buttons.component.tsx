import { TAssetName } from '@ukri/map/data-access-stac-catalog';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useEffect, useState } from 'react';

import { useResult } from '../../use-result.hook';
import { AssetItem } from './asset-item.component';
import { DownloadButton, ToggleAssetsButton } from './toggle-sssets-button.component';

export interface IMultipleItemsActionButtonsProps {
  addedForComparison: (key: TAssetName) => boolean;
  comparisonEnabled: boolean;
  canCompare: (key: TAssetName) => boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: (key: TAssetName) => void;
  onToggleSelectedItem: (key: TAssetName) => void;
  featureId: string;
  assets: TFeature['assets'];
}

export const MultipleItemsActionButtons = ({
  addedForComparison,
  comparisonEnabled,
  canCompare,
  canDownload,
  onToggleSelectedItem,
  onDownload,
  onCompareItemToggle,
  featureId,
  assets,
}: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndice, setSelectedIndice] = useState<TAssetName>();
  const { isSelectedMultipleIndices, isSelected, comparisonItems } = useResult();
  const [itemsInComparison, setItemsInComparison] = useState<string[]>([]);

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (assetName: TAssetName) => {
      if (isSelectedMultipleIndices(featureId, assetName)) {
        onToggleSelectedItem(assetName);
        setSelectedIndice(undefined);
      } else {
        onToggleSelectedItem(assetName);
        setSelectedIndice(assetName);
      }
    },
    [onToggleSelectedItem, isSelectedMultipleIndices, featureId]
  );

  const isItemSelected = useCallback(
    (assetName: TAssetName) => {
      return selectedIndice === assetName && isSelected(featureId);
    },
    [selectedIndice, isSelected, featureId]
  );

  useEffect(() => {
    setItemsInComparison((prev) => prev.filter((item) => addedForComparison(item as TAssetName)));
  }, [comparisonItems, addedForComparison]);

  const onComparisonToggle = useCallback(
    (key: TAssetName) => {
      setItemsInComparison((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
      onCompareItemToggle(key);
    },
    [onCompareItemToggle]
  );

  return (
    <div>
      <div className='flex space-between'>
        {canDownload && <DownloadButton onDownload={onDownload} disabled={comparisonEnabled} />}
        <ToggleAssetsButton isOpened={isOpened} onToggle={onToggleShowAssets} itemsInComparison={itemsInComparison} />
      </div>

      {isOpened && (
        <div className='mt-2 border-t border-t-bright-dark'>
          {(Object.keys(indices) as TAssetName[]).map((key) => (
            <AssetItem
              key={key}
              assetKey={key}
              assetTitle={assets[key]?.title}
              isSelected={isItemSelected(key)}
              addedForComparison={addedForComparison(key)}
              canCompare={canCompare(key)}
              comparisonEnabled={comparisonEnabled}
              onComparisonToggle={() => onComparisonToggle(key)}
              onToggleView={() => onToggleViewButton(key)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

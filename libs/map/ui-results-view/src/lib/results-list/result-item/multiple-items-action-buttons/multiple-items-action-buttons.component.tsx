import { TAssetName } from '@ukri/map/data-access-stac-catalog';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useEffect, useState } from 'react';

import { useResult } from '../../use-result.hook';
import { AssetItem } from './asset-item.component';
import { DownloadButton, ToggleAssetsButton } from './toggle-sssets-button.component';

export interface IMultipleItemsActionButtonsProps {
  canDownload: boolean;
  feature: TFeature;
}

export const MultipleItemsActionButtons = ({ canDownload, feature }: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndice, setSelectedIndice] = useState<TAssetName>();
  const {
    isSelectedMultipleIndices,
    isSelected,
    comparisonItems,
    comparisonEnabled,
    isItemAddedToComparisonMode,
    canCompareItems,
    downloadItem,
    toggleCompareItem,
    toggleItem,
  } = useResult();
  const [itemsInComparison, setItemsInComparison] = useState<string[]>([]);

  const { thumbnail, ...indices } = feature.assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (assetName: TAssetName) => {
      if (isSelectedMultipleIndices(feature.id, assetName)) {
        toggleItem(feature, assetName);
        setSelectedIndice(undefined);
      } else {
        toggleItem(feature, assetName);
        setSelectedIndice(assetName);
      }
    },
    [toggleItem, isSelectedMultipleIndices, feature]
  );

  const isItemSelected = useCallback(
    (assetName: TAssetName) => {
      return selectedIndice === assetName && isSelected(feature.id);
    },
    [selectedIndice, isSelected, feature.id]
  );

  useEffect(() => {
    setItemsInComparison((prev) => prev.filter((item) => isItemAddedToComparisonMode(feature, item as TAssetName)));
  }, [comparisonItems, isItemAddedToComparisonMode, feature]);

  const onComparisonToggle = useCallback(
    (key: TAssetName) => {
      setItemsInComparison((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
      toggleCompareItem(feature, key);
    },
    [toggleCompareItem, feature]
  );

  return (
    <div>
      <div className='flex space-between'>
        {canDownload && <DownloadButton onDownload={() => downloadItem(feature)} disabled={comparisonEnabled} />}
        <ToggleAssetsButton isOpened={isOpened} onToggle={onToggleShowAssets} itemsInComparison={itemsInComparison} />
      </div>

      {isOpened && (
        <div className='mt-2 border-t border-t-bright-dark'>
          {(Object.keys(indices) as TAssetName[]).map((key) => (
            <AssetItem
              key={key}
              assetKey={key}
              assetTitle={feature.assets[key]?.title}
              isSelected={isItemSelected(key)}
              addedForComparison={isItemAddedToComparisonMode(feature, key)}
              canCompare={canCompareItems(feature, key)}
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

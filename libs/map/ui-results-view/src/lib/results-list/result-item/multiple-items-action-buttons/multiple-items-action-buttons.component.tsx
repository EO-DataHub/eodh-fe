import { TAssetName } from '@ukri/map/data-access-stac-catalog';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useResult } from '../../use-result.hook';
import { AssetItem } from './asset-item.component';
import { DownloadButton, ToggleAssetsButton } from './toggle-sssets-button.component';

export interface IMultipleItemsActionButtonsProps {
  canDownload: boolean;
  feature: TFeature;
}

export const MultipleItemsActionButtons = ({ canDownload, feature }: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    isSelected,
    comparisonEnabled,
    itemAddedToComparisonMode,
    canCompareItems,
    downloadItem,
    toggleCompareItem,
    toggleItem,
    countItemsAddedToComparisonMode,
    assetNameWhichShouldBeDisplayed,
  } = useResult();
  const [itemsInComparison, setItemsInComparison] = useState<number>(0);

  const { thumbnail, ...rawIndices } = feature.assets;
  const indices = useMemo(() => Object.keys(rawIndices), [rawIndices]) as TAssetName[];

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const isItemSelected = useCallback(
    (assetName: TAssetName) => {
      return assetNameWhichShouldBeDisplayed === assetName && isSelected(feature.id);
    },
    [isSelected, feature.id, assetNameWhichShouldBeDisplayed]
  );

  useEffect(() => {
    const count = countItemsAddedToComparisonMode(feature);
    setItemsInComparison(count);
  }, [feature, countItemsAddedToComparisonMode]);

  const onComparisonToggle = useCallback(
    (key: TAssetName) => {
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
          {indices.map((key) => (
            <AssetItem
              key={key}
              assetKey={key}
              assetTitle={feature.assets[key]?.title}
              isSelected={isItemSelected(key)}
              addedForComparison={itemAddedToComparisonMode(feature, key)}
              canCompare={canCompareItems(feature, key)}
              comparisonEnabled={comparisonEnabled}
              onComparisonToggle={() => onComparisonToggle(key)}
              onToggleView={() => toggleItem(feature, key)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

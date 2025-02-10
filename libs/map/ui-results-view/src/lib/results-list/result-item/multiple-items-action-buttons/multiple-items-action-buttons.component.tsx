import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback, useEffect, useState } from 'react';

import { useResult } from '../../use-result.hook';
import { AssetItem } from './asset-item.component';
import { DownloadButton, ToggleAssetsButton } from './toggle-sssets-button.component';

export interface IMultipleItemsActionButtonsProps {
  addedForComparison: (key: TAssetKey) => boolean;
  comparisonEnabled: boolean;
  canCompare: (key: TAssetKey) => boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: (key: TAssetKey) => void;
  onToggleSelectedItem: (key: TAssetKey) => void;
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
  const [selectedIndice, setSelectedIndice] = useState<TAssetKey>();
  const { isSelectedMultipleIndices, isSelected, comparisonItems } = useResult();
  const [itemsInComparison, setItemsInComparison] = useState<string[]>([]);

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (key: TAssetKey) => {
      if (isSelected(featureId)) {
        if (isSelectedMultipleIndices(featureId, key)) {
          onToggleSelectedItem(key);
          setSelectedIndice(undefined);
        } else {
          onToggleSelectedItem(key);
          setSelectedIndice(key);
        }
      } else {
        onToggleSelectedItem(key);
        setSelectedIndice(key);
      }
    },
    [onToggleSelectedItem, isSelectedMultipleIndices, featureId, isSelected]
  );

  const isItemSelected = useCallback(
    (key: TAssetKey) => {
      return selectedIndice === key && isSelected(featureId);
    },
    [selectedIndice, isSelected, featureId]
  );

  useEffect(() => {
    setItemsInComparison((prev) => prev.filter((item) => addedForComparison(item as TAssetKey)));
  }, [comparisonItems, addedForComparison]);

  const onComparisonToggle = useCallback(
    (key: TAssetKey) => {
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
          {(Object.keys(indices) as TAssetKey[]).map((key) => (
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

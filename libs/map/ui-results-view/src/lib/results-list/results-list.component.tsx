import { useMode } from '@ukri/map/data-access-map';
import { TAssetName, TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';

import { MultipleItemsActionButtons } from './result-item/multiple-items-action-buttons/multiple-items-action-buttons.component';
import { ResultItem } from './result-item/result-item.component';
import { SingleItemActionButtons } from './result-item/single-item-action-buttons.component';
import { useResult } from './use-result.hook';

interface IActionButtons {
  feature: TFeature;
  mode: 'search' | 'action-creator';
  comparisonEnabled: boolean;
  isItemAddedToComparisonMode: (feature: TFeature, key?: TAssetName) => boolean;
  canCompareItems: (feature: TFeature, key?: TAssetName) => boolean;
  downloadItem: (feature: TFeature) => void;
  toggleCompareItem: (feature: TFeature, key?: TAssetName) => void;
  toggleItem: (feature: TFeature, key?: TAssetName) => void;
  isSelected: (id: string) => boolean;
}

const ActionButtons = ({
  feature,
  mode,
  comparisonEnabled,
  isItemAddedToComparisonMode,
  canCompareItems,
  downloadItem,
  toggleCompareItem,
  toggleItem,
  isSelected,
}: IActionButtons) => {
  if (mode === 'action-creator' && Object.keys(feature.assets).length > 1) {
    return <MultipleItemsActionButtons feature={feature} canDownload={mode === 'action-creator'} />;
  }
  return (
    <SingleItemActionButtons
      selected={isSelected(feature.id)}
      comparisonEnabled={comparisonEnabled}
      addedForComparison={isItemAddedToComparisonMode(feature)}
      canDownload={mode === 'action-creator'}
      canCompare={canCompareItems(feature)}
      onDownload={() => downloadItem(feature)}
      onCompareItemToggle={() => toggleCompareItem(feature)}
      onToggleSelectedItem={() => toggleItem(feature)}
    />
  );
};

export interface IResultsListProps {
  features: TCollection['features'];
}

export const ResultsList = ({ features }: IResultsListProps) => {
  const {
    isSelected,
    toggleItem,
    downloadItem,
    canCompareItems,
    isItemAddedToComparisonMode,
    comparisonEnabled,
    toggleCompareItem,
  } = useResult();
  const { mode } = useMode();

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
        <ResultItem
          key={feature.id}
          className='mb-4'
          imageUrl={feature.assets.thumbnail?.href || ''}
          gridCode={feature.properties['grid:code']}
          cloudCoverage={feature.properties['eo:cloud_cover']}
          collectionName={feature.collection}
          dateTime={feature.properties.datetime}
          selected={isSelected(feature.id)}
          onToggleSelectedItem={() => toggleItem(feature)}
          hasManyIndices={Object.keys(feature.assets).length > 1}
        >
          <ActionButtons
            feature={feature}
            mode={mode}
            comparisonEnabled={comparisonEnabled}
            isItemAddedToComparisonMode={isItemAddedToComparisonMode}
            canCompareItems={canCompareItems}
            downloadItem={downloadItem}
            toggleCompareItem={toggleCompareItem}
            toggleItem={toggleItem}
            isSelected={isSelected}
          />
        </ResultItem>
      ))}
    </div>
  );
};

import { useMode } from '@ukri/map/data-access-map';
import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';

import { MultipleItemsActionButtons } from './result-item/multiple-items-action-buttons.component';
import { ResultItem } from './result-item/result-item.component';
import { SingleItemActionButtons } from './result-item/single-item-action-buttons.component';
import { useResult } from './use-result.hook';

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
      {features.map((feature: TFeature) =>
        mode === 'action-creator' && Object.keys(feature.assets).length > 1 ? (
          <ResultItem
            key={feature.id}
            className='mb-4'
            imageUrl={feature.assets.thumbnail?.href || ''}
            gridCode={feature.properties['grid:code']}
            cloudCoverage={feature.properties['eo:cloud_cover']}
            collectionName={feature.collection}
            dateTime={feature.properties.datetime}
            selected={isSelected(feature.id)}
          >
            <MultipleItemsActionButtons
              comparisonEnabled={comparisonEnabled}
              addedForComparison={isItemAddedToComparisonMode(feature)}
              canDownload={mode === 'action-creator'}
              canCompare={canCompareItems(feature)}
              onDownload={() => downloadItem(feature)}
              onCompareItemToggle={() => toggleCompareItem(feature)}
              onToggleSelectedItem={(key: 'thumbnail' | 'visual' | 'cdom' | 'cya_cells' | 'doc' | 'turb' | undefined) =>
                toggleItem(feature, key)
              }
              assets={feature.assets}
              featureId={feature.id}
            />
          </ResultItem>
        ) : (
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
          >
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
          </ResultItem>
        )
      )}
    </div>
  );
};

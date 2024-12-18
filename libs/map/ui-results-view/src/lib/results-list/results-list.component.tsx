import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';

import { ResultItem } from './result-item/result-item.component';
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

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
        <ResultItem
          key={feature.id}
          className='mb-4'
          collectionName={feature.collection}
          dateTime={feature.properties.datetime}
          imageUrl={feature.assets.thumbnail?.href || ''}
          cloudCoverage={feature.properties['eo:cloud_cover']}
          gridCode={feature.properties['grid:code']}
          selected={isSelected(feature.id)}
          comparisonEnabled={comparisonEnabled}
          addedForComparison={isItemAddedToComparisonMode(feature)}
          canCompare={canCompareItems(feature)}
          onToggleSelectedItem={() => toggleItem(feature)}
          onDownload={() => downloadItem(feature)}
          onCompareItemToggle={() => toggleCompareItem(feature)}
        />
      ))}
    </div>
  );
};

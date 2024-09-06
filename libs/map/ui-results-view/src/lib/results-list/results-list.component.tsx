import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultItem } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  features: TCollection['features'];
}

export const ResultsList = ({ features }: IResultsListProps) => {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | string | null>(null);

  const handleThumbnailSelect = useCallback((thumbnailId: number | string) => {
    setSelectedThumbnailId(thumbnailId);
  }, []);

  return (
    <div>
      {features.map((feature) => (
        <ResultItem
          key={feature.id}
          className='mb-4'
          collectionName={feature.collection}
          dateTime={feature.properties.datetime}
          imageUrl={feature.assets.thumbnail.href || ''}
          id={feature.id}
          cloudCoverage={feature.properties['eo:cloud_cover']}
          gridCode={feature.properties['grid:code']}
          selected={selectedThumbnailId === feature.id}
          onSelected={() => handleThumbnailSelect(feature.id)}
          // TODO actual functions to be added in future
          onAddToCompare={() => {
            return;
          }}
          onRemoveFromCompare={() => {
            return;
          }}
        />
      ))}
    </div>
  );
};

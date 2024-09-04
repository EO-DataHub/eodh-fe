import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultItem } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  data: TCollection['features'];
}

export const ResultsList = ({ data }: IResultsListProps) => {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | string | null>(null);

  const handleThumbnailSelect = useCallback((thumbnailId: number | string) => {
    setSelectedThumbnailId(thumbnailId);
  }, []);

  return (
    <div>
      {data.map((item) => (
        <ResultItem
          key={item.id}
          className='mb-4'
          collectionName={item.collection}
          dateTime={item.properties.datetime}
          imageUrl={item.assets.thumbnail.href || ''}
          id={item.id}
          cloudCoverage={item.properties['eo:cloud_cover']}
          gridCode={item.properties['grid:code']}
          selected={selectedThumbnailId === item.id}
          onSelected={() => handleThumbnailSelect(item.id)}
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

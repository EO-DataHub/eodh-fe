import { type IResultItemProps, ResultItem } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  results: IResultItemProps[];
}

export const ResultsList = ({ results }: IResultsListProps) => {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | string | null>(null);

  const handleThumbnailSelect = useCallback((thumbnailId: number | string) => {
    setSelectedThumbnailId(thumbnailId);
  }, []);

  return (
    <div>
      {results.map((resultItem, index) => (
        <ResultItem
          className='mb-4'
          key={index}
          {...resultItem}
          selected={selectedThumbnailId === resultItem.id}
          onSelected={() => handleThumbnailSelect(resultItem.id)}
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

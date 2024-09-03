import { type IThumbnailProps, Thumbnail } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  results: IThumbnailProps[];
}

export const ResultsList = ({ results }: IResultsListProps) => {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | string | null>(null);

  const handleThumbnailSelect = useCallback((thumbnailId: number | string) => {
    setSelectedThumbnailId(thumbnailId);
  }, []);

  return (
    <div>
      {results.map((thumbnail, index) => (
        <Thumbnail
          className='mb-4'
          key={index}
          {...thumbnail}
          selected={selectedThumbnailId === thumbnail.id}
          onSelected={() => handleThumbnailSelect(thumbnail.id)}
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

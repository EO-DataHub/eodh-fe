import { type IThumbnailProps, Thumbnail } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  results: IThumbnailProps[];
}

export const ResultsList = ({ results }: IResultsListProps) => {
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState<number | null>(null);

  const handleThumbnailSelect = useCallback((index: number) => {
    setSelectedThumbnailIndex(index);
  }, []);

  return (
    <div className='thumbnail-list'>
      {results.map((thumbnail, index) => (
        <Thumbnail
          className='mb-4'
          key={index}
          {...thumbnail}
          selected={selectedThumbnailIndex === index}
          onSelected={() => handleThumbnailSelect(index)}
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

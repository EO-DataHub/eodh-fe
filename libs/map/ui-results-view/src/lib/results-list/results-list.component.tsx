import { useStacUrlMutation } from '@ukri/map/data-access-map';
import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultItem } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  features: TCollection['features'];
}

export const ResultsList = ({ features }: IResultsListProps) => {
  const [selectedFeature, setSelectedFeature] = useState<TCollection['features'][number] | null>(null);
  const setStacUrl = useStacUrlMutation();

  const handleThumbnailSelect = useCallback(
    (feature: TCollection['features'][number]) => {
      setSelectedFeature(feature);
      setStacUrl(feature.links.find((link) => link.rel === 'self')?.href);
    },
    [setStacUrl]
  );

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
          selected={selectedFeature?.id === feature.id}
          onSelected={() => handleThumbnailSelect(feature)}
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

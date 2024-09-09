import { useTrueColorImageUrlMutation } from '@ukri/map/data-access-map';
import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';
import { ResultItem } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IResultsListProps {
  features: TCollection['features'];
}

export const ResultsList = ({ features }: IResultsListProps) => {
  const [selectedFeature, setSelectedFeature] = useState<TFeature | null>(null);
  const setStacUrl = useTrueColorImageUrlMutation();

  const handleThumbnailSelect = useCallback(
    (feature: TFeature) => {
      if (selectedFeature?.id !== feature.id) {
        setSelectedFeature(feature);
        setStacUrl(feature.links.find((link: { rel?: string }) => link.rel === 'self')?.href);
      } else {
        setSelectedFeature(null);
        setStacUrl('');
      }
    },
    [selectedFeature, setStacUrl]
  );

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
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

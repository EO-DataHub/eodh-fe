import { useTrueColorImage } from '@ukri/map/data-access-map';
import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';
import { useCallback } from 'react';

import { ResultItem } from './result-item/result-item';

export interface IResultsListProps {
  features: TCollection['features'];
}

export const ResultsList = ({ features }: IResultsListProps) => {
  const { feature: selectedFeature, setFeature } = useTrueColorImage();

  const handleSelectedItemToggle = useCallback(
    (feature: TFeature) => {
      if (selectedFeature?.id !== feature.id) {
        setFeature(feature);
      } else {
        setFeature(undefined);
      }
    },
    [selectedFeature, setFeature]
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
          onToggleSelectedItem={() => handleSelectedItemToggle(feature)}
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

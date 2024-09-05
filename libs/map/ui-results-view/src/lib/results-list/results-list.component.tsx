import { TCollectionSchema } from '@ukri/map/data-access-stac-catalog';
import { GeoTiffLayer } from '@ukri/map/ui-map';
import { ResultItem } from '@ukri/shared/design-system';
import { useCallback, useContext, useEffect, useState } from 'react';

export interface IResultsListProps {
  data: TCollectionSchema['features'];
}

export const ResultsList = ({ data }: IResultsListProps) => {
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<number | string | null>(null);
  // const [selectedStacItem, setSelectedStacItem] = useState<any | null>(data[0]);
  // const map = useContext(MapContext);

  const handleThumbnailSelect = useCallback((thumbnailId: number | string) => {
    setSelectedThumbnailId(thumbnailId);
    // const selectedItem = data.find((item) => item.id === thumbnailId);
    // setSelectedStacItem(selectedItem || null);
  }, []);

  // useEffect(() => {
  //   if (tileLayer && map) {
  //     console.log('map', map.getLayers().getArray());
  //   }

  //   return () => {
  //     if (tileLayer && map) {
  //       map.removeLayer(tileLayer);
  //     }
  //   };
  // }, [tileLayer, map, selectedStacItem]);

  // useEffect(() => {
  //   console.log('imageLayer', imageLayer);
  //   if (imageLayer) {
  //     map.addLayer(imageLayer);
  //   }

  //   return () => {
  //     if (imageLayer) {
  //       map.removeLayer(imageLayer);
  //     }
  //   };
  // }, [imageLayer, map, selectedStacItem]);

  return (
    <div>
      {data.map((item) => (
        <>
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
          <GeoTiffLayer url={item.assets.visual.href} className='flex w-full' />
        </>
      ))}
    </div>
  );
};

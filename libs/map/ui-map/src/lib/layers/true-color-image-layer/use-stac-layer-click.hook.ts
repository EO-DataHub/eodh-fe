import { useComparisonMode, useTrueColorImage } from '@ukri/map/data-access-map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { fromLonLat } from 'ol/proj';
import { useCallback, useContext, useEffect } from 'react';

import { MapContext } from '../../map.component';

type TCoordinate = [number, number];

const convertCoordinates = (geometry: { type: string; coordinates: number[][][] }): TCoordinate[] => {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates[0].map((coord) => fromLonLat(coord) as TCoordinate);
  }
  return [];
};

export const useStacLayerClick = () => {
  const map = useContext(MapContext);
  const { feature } = useTrueColorImage();
  const { comparisonModeEnabled } = useComparisonMode();

  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      if (comparisonModeEnabled) {
        return;
      }

      if (!feature || !map) {
        return;
      }

      const geometry = feature.geometry as { type: string; coordinates: number[][][] } | undefined;

      if (!geometry) {
        return;
      }

      const coords = convertCoordinates(geometry);

      if (coords.length === 0) {
        return;
      }

      const coordinate = event.coordinate;

      if (!coordinate) {
        return;
      }
    },
    [feature, map, comparisonModeEnabled]
  );

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on('click', handleMapClick);

    return () => {
      map.un('click', handleMapClick);
    };
  }, [map, handleMapClick]);
};

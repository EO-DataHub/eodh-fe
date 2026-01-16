import { useLegendStore, useTrueColorImage } from '@ukri/map/data-access-map';
import { boundingExtent } from 'ol/extent';
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
  const { feature, assetNameWhichShouldBeDisplayed } = useTrueColorImage();
  const { legends, focusLegend } = useLegendStore();

  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      if (!feature || !map || legends.length === 0) {
        return;
      }

      const featureId = feature.id;
      const assetName = assetNameWhichShouldBeDisplayed || 'data';
      const hasMatchingLegend = legends.some(
        (legend) => legend.featureId === featureId && legend.assetName === assetName
      );

      if (!hasMatchingLegend) {
        return;
      }

      const geometry = feature.geometry as { type: string; coordinates: number[][][] } | undefined;

      if (!geometry) {
        focusLegend(featureId, assetName);
        return;
      }

      const coords = convertCoordinates(geometry);

      if (coords.length === 0) {
        focusLegend(featureId, assetName);
        return;
      }

      const extent = boundingExtent(coords);
      const coordinate = event.coordinate;

      if (!coordinate) {
        return;
      }

      const [x, y] = coordinate;
      const [minX, minY, maxX, maxY] = extent;

      const isWithinExtent = x >= minX && x <= maxX && y >= minY && y <= maxY;

      if (isWithinExtent) {
        focusLegend(featureId, assetName);
      }
    },
    [feature, assetNameWhichShouldBeDisplayed, map, legends, focusLegend]
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

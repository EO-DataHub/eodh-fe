import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Circle as OlCircle, Geometry, Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Fill, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { useCallback, useEffect, useRef } from 'react';

import { IMap } from '../../map.component';

const SOURCE_PROJECTION = 'EPSG:3857';
const TARGET_PROJECTION = 'EPSG:4326';
const COORDINATE_PRECISION = 5;
const COORDINATE_LABELS_LAYER_Z_INDEX = 1000;

const formatCoordinate = (coord: Coordinate): string => {
  const [lng, lat] = transform(coord, SOURCE_PROJECTION, TARGET_PROJECTION);
  return `${lat.toFixed(COORDINATE_PRECISION)}, ${lng.toFixed(COORDINATE_PRECISION)}`;
};

const createLabelStyle = (index: number, text: string): Style => {
  return new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: '#3b82f6' }),
    }),
    text: new Text({
      text: `${index + 1}  ${text}`,
      font: 'bold 11px monospace',
      fill: new Fill({ color: 'white' }),
      backgroundFill: new Fill({ color: 'rgba(0, 0, 0, 0.75)' }),
      padding: [4, 8, 4, 8],
      offsetY: -24,
      textAlign: 'center',
      textBaseline: 'bottom',
    }),
  });
};

const getPolygonCoordinates = (geometry: Geometry): Coordinate[] => {
  if (geometry instanceof Polygon) {
    const coords = geometry.getCoordinates()[0];
    return coords.slice(0, -1);
  }

  if (geometry instanceof OlCircle) {
    return [geometry.getCenter()];
  }

  return [];
};

export const useCoordinateLabels = (map: IMap) => {
  const sourceRef = useRef<VectorSource>(new VectorSource({ wrapX: false }));
  const layerRef = useRef<VectorLayer<Feature<Geometry>> | null>(null);

  useEffect(() => {
    const layer = new VectorLayer({
      source: sourceRef.current,
      zIndex: COORDINATE_LABELS_LAYER_Z_INDEX,
    });

    map.addLayer(layer);
    layerRef.current = layer;

    return () => {
      map.removeLayer(layer);
      layerRef.current = null;
    };
  }, [map]);

  const clearLabels = useCallback(() => {
    sourceRef.current.clear();
  }, []);

  const updateLabels = useCallback(
    (geometry: Geometry | undefined) => {
      clearLabels();

      if (!geometry) {
        return;
      }

      const coordinates = getPolygonCoordinates(geometry);

      coordinates.forEach((coord, index) => {
        const formattedCoord = formatCoordinate(coord);
        const pointFeature = new Feature({
          geometry: new Point(coord),
        });

        pointFeature.setStyle(createLabelStyle(index, formattedCoord));
        sourceRef.current.addFeature(pointFeature);
      });
    },
    [clearLabels]
  );

  return {
    updateLabels,
    clearLabels,
  };
};

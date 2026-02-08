import { ICoordinateLabel, useCoordinates } from '@ukri/map/data-access-map';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Circle as OlCircle, Geometry, Point, Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { useCallback, useEffect, useRef } from 'react';

import { IMap } from '../../map.component';

const SOURCE_PROJECTION = 'EPSG:3857';
const TARGET_PROJECTION = 'EPSG:4326';
const COORDINATE_PRECISION = 5;

const formatCoordinate = (coord: Coordinate): string => {
  const [longitude, latitude] = transform(coord, SOURCE_PROJECTION, TARGET_PROJECTION);
  return `${latitude.toFixed(COORDINATE_PRECISION)}°, ${longitude.toFixed(COORDINATE_PRECISION)}°`;
};

const createLabelStyle = (text: string): Style => {
  return new Style({
    image: new CircleStyle({
      radius: 3,
      fill: new Fill({ color: '#3b82f6' }),
    }),
    text: new Text({
      text: text,
      font: 'bold',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({ color: '#fff', width: 5 }),
      backgroundFill: new Fill({ color: 'transparent' }),
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
  const { setCoordinates, clearCoordinates: clearStoreCoordinates, visible, toggleVisibility } = useCoordinates();

  useEffect(() => {
    if (!visible) {
      toggleVisibility();
    }
    const layer = new VectorLayer({
      source: sourceRef.current,
    });

    map.addLayer(layer);
    layerRef.current = layer;

    return () => {
      map.removeLayer(layer);
      layerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (layerRef.current && !visible) {
      layerRef.current.setVisible(false);
    } else {
      layerRef.current?.setVisible(true);
    }
  }, [visible]);

  const clearLabels = useCallback(() => {
    sourceRef.current.clear();
    clearStoreCoordinates();
  }, [clearStoreCoordinates]);

  const updateLabels = useCallback(
    (geometry: Geometry | undefined) => {
      clearLabels();

      if (!geometry) {
        return;
      }

      const coordinates = getPolygonCoordinates(geometry);
      const coordinateLabels: ICoordinateLabel[] = [];

      coordinates.forEach((coord, index) => {
        const formattedCoord = formatCoordinate(coord);
        const pointFeature = new Feature({
          geometry: new Point(coord),
        });
        pointFeature.setStyle(createLabelStyle(formattedCoord));
        sourceRef.current.addFeature(pointFeature);
        coordinateLabels.push({
          index,
          coordinate: coord,
          formatted: formattedCoord,
        });
      });
      setCoordinates(coordinateLabels);
    },
    [clearLabels, setCoordinates]
  );

  return {
    updateLabels,
    clearLabels,
  };
};

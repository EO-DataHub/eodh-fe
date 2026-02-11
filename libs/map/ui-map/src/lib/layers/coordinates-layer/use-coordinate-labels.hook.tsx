import { useAoi } from '@ukri/map/data-access-map';
import Feature from 'ol/Feature';
import { Geometry, Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Text } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { coordinatesLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';
import { formatCoordinate, getPolygonCoordinates } from './utils';

const createLabelStyle = (text: string): Style => {
  return new Style({
    image: new CircleStyle({
      radius: 2,
      fill: new Fill({ color: '#3b82f6' }),
    }),
    text: new Text({
      text: text,
      font: 'bold 12px poppins',
      fill: new Fill({ color: '#000' }),
      stroke: new Stroke({ color: '#fff', width: 4 }),
      backgroundFill: new Fill({ color: 'transparent' }),
      padding: [4, 8, 4, 8],
      textAlign: 'center',
      textBaseline: 'bottom',
    }),
  });
};

export const useCoordinateLabels = () => {
  const map = useContext(MapContext);
  const sourceRef = useRef<VectorSource>(new VectorSource({ wrapX: false }));
  const layerRef = useRef<VectorLayer<Feature<Geometry>> | null>(null);
  const {
    coordinateLabelsVisible,
    toggleCoordinateLabelsVisibility,
    setDrawingCompleted,
  } = useAoi();

  useEffect(() => {
    if (!coordinateLabelsVisible) {
      toggleCoordinateLabelsVisibility();
    }
    const layer = new VectorLayer({
      source: sourceRef.current,
      zIndex: coordinatesLayerZindex,
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
    if (layerRef.current && !coordinateLabelsVisible) {
      layerRef.current.setVisible(false);
    } else {
      layerRef.current?.setVisible(true);
    }
  }, [coordinateLabelsVisible]);

  const clearLabels = useCallback(() => {
    sourceRef.current.clear();
    setDrawingCompleted(false);
  }, [setDrawingCompleted]);

  const updateLabels = useCallback(
    (geometry: Geometry | undefined, isCompleted = false) => {
      clearLabels();

      if (!geometry) {
        return;
      }

      const coordinates = getPolygonCoordinates(geometry);

      coordinates.forEach((coord) => {
        const formattedCoord = formatCoordinate(coord);
        const pointFeature = new Feature({
          geometry: new Point(coord),
        });
        pointFeature.setStyle(createLabelStyle(formattedCoord));
        sourceRef.current.addFeature(pointFeature);
      });

      setDrawingCompleted(isCompleted);
    },
    [clearLabels, setDrawingCompleted]
  );

  return {
    updateLabels,
    clearLabels,
  };
};

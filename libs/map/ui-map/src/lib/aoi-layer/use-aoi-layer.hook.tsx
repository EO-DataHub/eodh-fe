import { useAoiLayerVisible, useCurrentAoi, useCurrentAoiMutation } from '@ukri/map/data-access-map';
import Feature, { FeatureLike } from 'ol/Feature';
import { Draw } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useContext, useEffect, useMemo, useState } from 'react';

import { aoiLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { TVectorLayer } from './aoi-layer.component';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { MultiPoint, Point } from 'ol/geom';
import { calculateCenter } from './geometry.utils';

export type TDraw = { draw: Draw; type: 'rectangle' | 'polygon' | 'circle' };

const style = new Style({
  geometry: function (feature) {
    const modifyGeometry = feature.get('modifyGeometry');
    return modifyGeometry ? modifyGeometry.geometry : feature.getGeometry();
  },
  fill: new Fill({
    color: 'rgba(68, 131, 255, 0.15)',
  }),
  stroke: new Stroke({
    color: getComputedStyle(document.documentElement).getPropertyValue('--colors-primary-main'),
    width: 1,
  }),
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({
      color: 'rgba(68, 131, 255, 0.15)',
    }),
  }),
});

const getStyles = (feature: FeatureLike) => {
    const styles = [style];
    const modifyGeometry = feature.get('modifyGeometry');
    const geometry = modifyGeometry
      ? modifyGeometry.geometry
      : feature.getGeometry();
    const result = calculateCenter(geometry);
    const center = result.center;

    if (center) {
      const coordinates = result.coordinates;
      if (coordinates) {
        const minRadius = result.minRadius;
        const sqDistances = result.sqDistances;
        const rsq = minRadius * minRadius;
        const points = coordinates.filter((coordinate, index) => sqDistances && sqDistances[index] > rsq);

        styles.push(
          new Style({
            geometry: new MultiPoint(points),
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({
                color: 'rgba(68, 131, 255, 1)',
              }),
            }),
          }),
        );
      }
    }
    return styles;
  };

export const useAoiLayer = () => {
  const map = useContext(MapContext);
  const visible = useAoiLayerVisible();
  const [draw, setDraw] = useState<TDraw | undefined>(undefined);
  const [layer, setLayer] = useState<TVectorLayer | undefined>(undefined);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);
  const shape = useCurrentAoi();
  const setShape = useCurrentAoiMutation();

  useEffect(() => {
    const newSource = new VectorSource({ wrapX: false });
    const newLayer = new VectorLayer({
      source: newSource,
      zIndex: aoiLayerZindex,
      style: (feature) => getStyles(feature),
    });

    map.addLayer(newLayer);
    setSource(newSource);
    setLayer(newLayer);

    return () => {
      map.removeLayer(newLayer);
    };
  }, [map]);

  useEffect(() => {
    if (!shape) {
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape);
    source?.addFeature(feature);

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape, source]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    draw.draw.on('drawstart', () => setShape(undefined));
    draw.draw.on('drawend', (event: DrawEvent) => {
      map.removeInteraction(draw.draw);
      setShape(event.feature.getGeometry());
      setDraw(undefined);
    });
    map.addInteraction(draw.draw);

    return () => {
      map.removeInteraction(draw.draw);
    };
  }, [map, draw, setShape, setDraw]);

  useEffect(() => {
    if (!layer) {
      return;
    }

    layer.setVisible(visible);
  }, [layer, visible]);

  return useMemo(
    () => ({
      layer,
      draw,
      setDraw,
      source,
    }),
    [draw, source, layer]
  );
};

import { useAoiMode, useCurrentAoiMutation } from '@ukri/map/data-access-map';
import { Modify, Translate } from 'ol/interaction.js';
import { Geometry, Point, Polygon } from 'ol/geom';
import { useContext, useEffect } from 'react';

import { MapContext } from '../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';
import { never, platformModifierKeyOnly, primaryAction, shiftKeyOnly } from 'ol/events/condition';
import { getCenter, getHeight, getWidth } from 'ol/extent';
import Feature, { FeatureLike } from 'ol/Feature';
import { StyleFunction } from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';
import VectorSource from 'ol/source/Vector';
import { calculateCenter } from '../geometry.utils';

const modifyGeometry = (feature: Feature, point: Coordinate) => {
  const modifyGeometry = feature.get('modifyGeometry');

  if (!modifyGeometry) {
    return;
  }

  let modifyPoint = modifyGeometry.point;

  if (!modifyPoint) {
    // save the initial geometry and vertex position
    modifyPoint = point;
    modifyGeometry.point = modifyPoint;
    modifyGeometry.geometry0 = modifyGeometry.geometry;
    // get anchor and minimum radius of vertices to be used
    const result = calculateCenter(modifyGeometry.geometry0);
    modifyGeometry.center = result.center;
    modifyGeometry.minRadius = result.minRadius;
  }

  const center = modifyGeometry.center;
  const minRadius = modifyGeometry.minRadius;
  let dx, dy;
  dx = modifyPoint[0] - center[0];
  dy = modifyPoint[1] - center[1];
  const initialRadius = Math.sqrt(dx * dx + dy * dy);

  if (initialRadius > minRadius) {
    const initialAngle = Math.atan2(dy, dx);
    dx = point[0] - center[0];
    dy = point[1] - center[1];
    const currentRadius = Math.sqrt(dx * dx + dy * dy);
    if (currentRadius > 0) {
      const currentAngle = Math.atan2(dy, dx);
      const geometry = modifyGeometry.geometry0.clone();
      geometry.scale(currentRadius / initialRadius, undefined, center);
      geometry.rotate(currentAngle - initialAngle, center);
      modifyGeometry.geometry = geometry;
    }
  }
}

const getStyles = (feature: FeatureLike, source: VectorSource ) => {
  const point = (feature.getGeometry() as Point)?.getCoordinates();
  feature.get('features').forEach((modifyFeature: Feature) => {
    modifyGeometry(modifyFeature, point);
  });

  const defaultStyle: StyleFunction | undefined = new Modify({ source: source })
    .getOverlay()
    .getStyleFunction();

  if (defaultStyle) {
    return defaultStyle(feature, 1);
  }
}

export const useSimpleEdit = (enabled: boolean) => {
  const { source, layer } = useContext(AoiLayerContext);
  const map = useContext(MapContext);
  const mode = useAoiMode();
  const setShape = useCurrentAoiMutation();

  useEffect(() => {
    if (!enabled || !source || !layer || mode !== 'search') {
      return;
    }

    const modify = new Modify({
      source,
      condition: (event) => primaryAction(event) && shiftKeyOnly(event),
      deleteCondition: never,
      insertVertexCondition: never,
      style: (feature) => getStyles(feature, source),
    });

    modify.on('modifystart', (event) => {
      const enabled = shiftKeyOnly(event.mapBrowserEvent);
      console.log('enabled', enabled);
      if (!enabled) {
        return;
      }
      event.features.forEach((feature: Feature<Geometry>) => {
        feature.set(
          'modifyGeometry',
          { geometry: feature.getGeometry()?.clone() },
          true,
        );
      });
    });

    modify.on('modifyend', function (event) {
      const enabled = shiftKeyOnly(event.mapBrowserEvent);
      if (!enabled) {
        return;
      }

      event.features.forEach(function (feature) {
        const modifyGeometry = feature.get('modifyGeometry');

        if (modifyGeometry) {
          feature.setGeometry(modifyGeometry.geometry);
          feature.unset('modifyGeometry', true);
          setShape(event.features.pop()?.getGeometry())
        }
      });
    });

    const translate = new Translate({
      condition: (event) => primaryAction(event) && platformModifierKeyOnly(event),
      layers: [layer]
    });

    map.addInteraction(modify);
    map.addInteraction(translate);

    return () => {
      map.removeInteraction(modify);
      map.removeInteraction(translate);
    };
  }, [enabled, map, mode, source, layer, setShape]);
};

import { useAoi } from '@ukri/map/data-access-map';
import { MapBrowserEvent } from 'ol';
import Feature from 'ol/Feature';
import { Geometry, Polygon } from 'ol/geom';
import { fromExtent } from 'ol/geom/Polygon';
import { Modify } from 'ol/interaction.js';
import { ModifyEvent } from 'ol/interaction/Modify';
import { squaredDistance } from 'ol/math';
import { useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';
const isFeaturePolygon = (feature: Feature<Geometry>): feature is Feature<Polygon> =>
  feature.getGeometry()?.getType() === 'Polygon';

export const useRectangleResizeEdit = (enabled: boolean) => {
  const map = useContext(MapContext);
  const { source, layer } = useContext(AoiLayerContext);
  const { state, updateShape, shape } = useAoi();
  const isUpdatingRef = useRef(false);
  const dragState = useRef<{
    feature: Feature<Polygon>;
    anchorCorner: number[];
  } | null>(null);

  useEffect(() => {
    if (!enabled || !source || !layer || state !== 'edit' || shape?.type !== 'rectangle') {
      return;
    }

    const modify = new Modify({ source });

    const modifyStartListener = (event: ModifyEvent) => {
      const feature = [...event.features.getArray()].pop();

      if (dragState.current || !feature || !isFeaturePolygon(feature)) {
        return;
      }

      const geometry = feature.getGeometry();
      if (!geometry || !isPolygon(geometry)) {
        return;
      }

      const corners = geometry.getCoordinates()[0];
      const clickCoordinate = event.mapBrowserEvent.coordinate;

      let closestCornerIndex = -1;
      let minDistance = Infinity;
      corners.slice(0, 4).forEach((corner, index) => {
        const distance = squaredDistance(clickCoordinate[0], clickCoordinate[1], corner[0], corner[1]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCornerIndex = index;
        }
      });

      if (closestCornerIndex === -1) {
        return;
      }

      const anchorCorner = corners[(closestCornerIndex + 2) % 4];

      dragState.current = {
        feature,
        anchorCorner,
      };

      map.on('pointerdrag', pointerDragListener);
    };

    const pointerDragListener = (event: MapBrowserEvent<UIEvent>) => {
      if (!dragState.current || isUpdatingRef.current) {
        return;
      }

      const { feature, anchorCorner } = dragState.current;
      const draggedCoordinate = event.coordinate;
      const newExtent = [
        Math.min(anchorCorner[0], draggedCoordinate[0]),
        Math.min(anchorCorner[1], draggedCoordinate[1]),
        Math.max(anchorCorner[0], draggedCoordinate[0]),
        Math.max(anchorCorner[1], draggedCoordinate[1]),
      ];

      const newRect = fromExtent(newExtent);

      isUpdatingRef.current = true;
      feature.setGeometry(newRect);
      isUpdatingRef.current = false;
    };

    const modifyEndListener = () => {
      map.un('pointerdrag', pointerDragListener);

      if (dragState.current?.feature) {
        updateShape(dragState.current.feature.getGeometry());
      }

      dragState.current = null;
    };

    modify.on('modifystart', modifyStartListener);
    modify.on('modifyend', modifyEndListener);
    map.addInteraction(modify);

    return () => {
      map.un('pointerdrag', pointerDragListener);
      map.removeInteraction(modify);
    };
  }, [enabled, layer, map, source, state, updateShape, shape, dragState]);
};

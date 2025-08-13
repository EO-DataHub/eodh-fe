import { useAoi } from '@ukri/map/data-access-map';
import { MapBrowserEvent } from 'ol';
import { Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import { Geometry, Point, Polygon } from 'ol/geom';
import { fromExtent } from 'ol/geom/Polygon';
import { Modify } from 'ol/interaction.js';
import { ModifyEvent } from 'ol/interaction/Modify';
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
    mode: 'corner' | 'edge';
    anchorCorner?: number[];
    originalExtent?: Extent;
    edge?: 'top' | 'bottom' | 'left' | 'right';
  } | null>(null);

  useEffect(() => {
    if (!enabled || !source || !layer || shape?.type !== 'rectangle') {
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

      const modifyInstance = event.target as { vertexFeature_: Feature<Point> | undefined } | undefined;

      const draggedVertex = modifyInstance?.vertexFeature_;
      const originalExtent = geometry.getExtent();
      const clickCoordinate = event.mapBrowserEvent.coordinate;

      const draggedCoord = draggedVertex?.getGeometry()?.getCoordinates();
      const originalCorners = geometry.getCoordinates()[0];
      let cornerIndex = -1;

      if (draggedCoord) {
        cornerIndex = originalCorners.findIndex((c) => c[0] === draggedCoord[0] && c[1] === draggedCoord[1]);
      }

      if (cornerIndex !== -1) {
        dragState.current = {
          feature,
          mode: 'corner',
          anchorCorner: originalCorners[(cornerIndex + 2) % 4],
        };
      } else {
        const [minX, minY, maxX, maxY] = originalExtent;
        const distToTop = Math.abs(clickCoordinate[1] - maxY);
        const distToBottom = Math.abs(clickCoordinate[1] - minY);
        const distToLeft = Math.abs(clickCoordinate[0] - minX);
        const distToRight = Math.abs(clickCoordinate[0] - maxX);
        const minEdgeDist = Math.min(distToTop, distToBottom, distToLeft, distToRight);

        let edge: 'top' | 'bottom' | 'left' | 'right' = 'top';
        switch (minEdgeDist) {
          case distToTop: {
            edge = 'top';

            break;
          }
          case distToBottom: {
            edge = 'bottom';

            break;
          }
          case distToLeft: {
            edge = 'left';

            break;
          }
          case distToRight: {
            edge = 'right';

            break;
          }
        }

        dragState.current = {
          feature,
          mode: 'edge',
          originalExtent,
          edge,
        };
      }

      map.on('pointermove', pointerMoveListener);
    };

    const pointerMoveListener = (event: MapBrowserEvent<UIEvent>) => {
      if (!dragState.current || isUpdatingRef.current) {
        return;
      }

      const { feature, mode } = dragState.current;
      const currentCoordinate = event.coordinate;
      let newExtent: Extent | null = null;

      if (mode === 'corner' && dragState.current.anchorCorner) {
        const { anchorCorner } = dragState.current;
        newExtent = [
          Math.min(anchorCorner[0], currentCoordinate[0]),
          Math.min(anchorCorner[1], currentCoordinate[1]),
          Math.max(anchorCorner[0], currentCoordinate[0]),
          Math.max(anchorCorner[1], currentCoordinate[1]),
        ];
      } else if (mode === 'edge' && dragState.current.originalExtent && dragState.current.edge) {
        const { edge, originalExtent } = dragState.current;
        const [minX, minY, maxX, maxY] = originalExtent;
        switch (edge) {
          case 'top':
            newExtent = [minX, minY, maxX, currentCoordinate[1]];
            break;
          case 'bottom':
            newExtent = [minX, currentCoordinate[1], maxX, maxY];
            break;
          case 'left':
            newExtent = [currentCoordinate[0], minY, maxX, maxY];
            break;
          case 'right':
            newExtent = [minX, minY, currentCoordinate[0], maxY];
            break;
        }

        if (newExtent) {
          if (newExtent[0] > newExtent[2]) {
            [newExtent[0], newExtent[2]] = [newExtent[2], newExtent[0]];
          }
          if (newExtent[1] > newExtent[3]) {
            [newExtent[1], newExtent[3]] = [newExtent[3], newExtent[1]];
          }
        }
      }

      if (newExtent) {
        const newRect = fromExtent(newExtent);

        isUpdatingRef.current = true;
        feature.setGeometry(newRect);
        isUpdatingRef.current = false;
      }
    };

    const modifyEndListener = () => {
      map.un('pointermove', pointerMoveListener);

      if (dragState.current?.feature) {
        updateShape(dragState.current.feature.getGeometry());
      }

      dragState.current = null;
    };

    modify.on('modifystart', modifyStartListener);
    modify.on('modifyend', modifyEndListener);
    map.addInteraction(modify);

    return () => {
      map.un('pointermove', pointerMoveListener);
      map.removeInteraction(modify);
    };
  }, [enabled, layer, map, source, state, updateShape, shape]);
};

import { useAoi } from '@ukri/map/data-access-map';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Geometry, Polygon } from 'ol/geom';
import { Modify } from 'ol/interaction.js';
import { ModifyEvent } from 'ol/interaction/Modify';
import { unByKey } from 'ol/Observable';
import { useCallback, useContext, useEffect, useRef } from 'react';

import { MapContext } from '../../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

export const useRectangleResizeEdit = (enabled: boolean) => {
  const map = useContext(MapContext);
  const { source, layer } = useContext(AoiLayerContext);
  const { state, updateShape } = useAoi();
  const isUpdatingRef = useRef(false);
  const originalCoordinatesRef = useRef<number[][][] | undefined>(undefined);
  const dragOperationStateRef = useRef<{ draggedCornerIndex: number; anchorCornerIndex: number } | null>(null);

  const resizeGeometry = useCallback((event: BaseEvent) => {
    const modifiedGeometry = event.target as Polygon;
    const originalCoordinates = originalCoordinatesRef.current;
    let dragOperationState = dragOperationStateRef.current;

    if (isUpdatingRef.current || !originalCoordinates || !isPolygon(modifiedGeometry)) {
      return;
    }

    const newCoords = modifiedGeometry.getCoordinates()[0];

    if (!dragOperationState) {
      let changedVertexIndex = -1;
      for (let i = 0; i < 4; i++) {
        if (newCoords[i][0] !== originalCoordinates[0][i][0] || newCoords[i][1] !== originalCoordinates[0][i][1]) {
          changedVertexIndex = i;
          break;
        }
      }
      if (changedVertexIndex !== -1) {
        dragOperationState = {
          draggedCornerIndex: changedVertexIndex,
          anchorCornerIndex: (changedVertexIndex + 2) % 4,
        };
        dragOperationStateRef.current = dragOperationState;
      }
    }

    if (dragOperationState) {
      const fixedCorner = originalCoordinates[0][dragOperationState.anchorCornerIndex];
      const draggedCorner = newCoords[dragOperationState.draggedCornerIndex];

      const minX = Math.min(draggedCorner[0], fixedCorner[0]);
      const minY = Math.min(draggedCorner[1], fixedCorner[1]);
      const maxX = Math.max(draggedCorner[0], fixedCorner[0]);
      const maxY = Math.max(draggedCorner[1], fixedCorner[1]);

      const newRectCoords = [[[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY], [minX, minY]]];

      isUpdatingRef.current = true;
      modifiedGeometry.setCoordinates(newRectCoords);
      isUpdatingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!enabled || !source || !layer || state !== 'edit') {
      return;
    }

    const modify = new Modify({ source });

    let geometryChangeListenerKey: EventsKey | undefined;

    const modifyStartListener = (event: ModifyEvent) => {
      const geometry = event.features.getArray()[0]?.getGeometry();

      if (!geometry || !isPolygon(geometry)) {
        return;
      }

      originalCoordinatesRef.current = geometry.getCoordinates();
      dragOperationStateRef.current = null;
      geometryChangeListenerKey = geometry.on('change', resizeGeometry);
    };

    const modifyEndListener = (event: ModifyEvent) => {
      if (geometryChangeListenerKey) {
        unByKey(geometryChangeListenerKey);
        geometryChangeListenerKey = undefined;
      }

      originalCoordinatesRef.current = undefined;
      dragOperationStateRef.current = null;
      updateShape(event.features.getArray()[0]?.getGeometry());
    };

    modify.on('modifystart', modifyStartListener);
    modify.on('modifyend', modifyEndListener);

    map.addInteraction(modify);

    return () => {
      modify.un('modifystart', modifyStartListener);
      modify.un('modifyend', modifyEndListener);
      if (geometryChangeListenerKey) {
        unByKey(geometryChangeListenerKey);
      }
      map.removeInteraction(modify);
    };
  }, [enabled, layer, map, source, state, updateShape, resizeGeometry]);
};

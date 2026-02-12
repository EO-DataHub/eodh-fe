import { useAoi } from '@ukri/map/data-access-map';
import { Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import { Draw } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import { createBox } from 'ol/interaction/Draw.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { aoiLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';
import { useCoordinateLabels } from '../coordinates-layer/use-coordinate-labels.hook';
import { TVectorLayer } from './aoi-layer.component';

export type TDraw = { draw: Draw; type: 'rectangle' | 'polygon' | 'circle' };

export const useAoiLayer = () => {
  const map = useContext(MapContext);
  const { visible, shape, fitToAoi, setShape, toggleDrawingToolShape, setDrawingTool, drawingTool, setFitToAoi } =
    useAoi();
  const [draw, setDraw] = useState<TDraw | undefined>(undefined);
  const [layer, setLayer] = useState<TVectorLayer | undefined>(undefined);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);
  const { updateLabels, clearLabels } = useCoordinateLabels();
  const geometryChangeListenerRef = useRef<(() => void) | null>(null);
  const shouldPersistLabelsRef = useRef<boolean>(false);

  const fitToLayer = useCallback(
    (extent: Extent) => {
      if (!layer || !fitToAoi || !extent) {
        return;
      }

      const view = map.getView();
      view.fit(extent);

      const zoom = view.getZoom();
      if (zoom) {
        view.setZoom(zoom - 1);
      }

      setFitToAoi(false);
    },
    [fitToAoi, layer, map, setFitToAoi]
  );

  useEffect(() => {
    const newSource = new VectorSource({ wrapX: false });
    const newLayer = new VectorLayer({
      source: newSource,
      zIndex: aoiLayerZindex,
    });

    map.addLayer(newLayer);
    setSource(newSource);
    setLayer(newLayer);

    return () => {
      map.removeLayer(newLayer);
    };
  }, [map]);

  useEffect(() => {
    if (!source) {
      return;
    }

    source.clear();

    if (!shape?.shape) {
      clearLabels();
      shouldPersistLabelsRef.current = false;
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape.shape);
    source?.addFeature(feature);

    if (shape.type === 'polygon') {
      updateLabels(shape.shape, true);
      shouldPersistLabelsRef.current = true;
    } else {
      clearLabels();
      shouldPersistLabelsRef.current = false;
    }

    if (fitToAoi) {
      fitToLayer(shape.shape.getExtent());
    }

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape?.shape, shape?.type, source, fitToAoi, fitToLayer, updateLabels, clearLabels]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }
    draw.draw.setActive(!!drawingTool?.enabled);
  }, [draw?.draw, drawingTool?.enabled]);

  const cleanupGeometryChangeListener = useCallback(() => {
    if (geometryChangeListenerRef.current) {
      geometryChangeListenerRef.current();
      geometryChangeListenerRef.current = null;
    }
  }, []);

  const handleDrawStart = useCallback(
    (event: DrawEvent) => {
      setShape(undefined);
      clearLabels();
      shouldPersistLabelsRef.current = false;

      cleanupGeometryChangeListener();

      if (draw?.type === 'polygon') {
        const geometry = event.feature.getGeometry();
        if (geometry) {
          updateLabels(geometry);

          const changeKey = geometry.on('change', () => {
            updateLabels(geometry);
          });

          geometryChangeListenerRef.current = () => {
            geometry.un('change', changeKey.listener);
          };
        }
      }
    },
    [setShape, clearLabels, draw?.type, updateLabels, cleanupGeometryChangeListener]
  );

  const handleDrawEnd = useCallback(
    (event: DrawEvent) => {
      cleanupGeometryChangeListener();

      const geometry = event.feature.getGeometry();

      if (draw?.type === 'polygon' && geometry) {
        updateLabels(geometry, true);
        shouldPersistLabelsRef.current = true;
      } else {
        clearLabels();
        shouldPersistLabelsRef.current = false;
      }

      if (draw?.draw) {
        map.removeInteraction(draw.draw);
      }

      if (draw?.type) {
        setShape({ type: draw.type, shape: geometry });
      }
      setDrawingTool(undefined);
    },
    [draw?.type, draw?.draw, updateLabels, clearLabels, map, setShape, setDrawingTool, cleanupGeometryChangeListener]
  );

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    draw.draw.on('drawstart', handleDrawStart);
    draw.draw.on('drawend', handleDrawEnd);
    map.addInteraction(draw.draw);

    return () => {
      cleanupGeometryChangeListener();
      if (!shouldPersistLabelsRef.current) {
        clearLabels();
      }
      map.removeInteraction(draw.draw);
    };
  }, [map, draw?.draw, handleDrawStart, handleDrawEnd, clearLabels, cleanupGeometryChangeListener]);

  useEffect(() => {
    switch (drawingTool?.type) {
      case 'rectangle': {
        const rectangle = new Draw({
          geometryName: 'Rectangle',
          type: 'Circle',
          geometryFunction: createBox(),
          freehand: true,
        });
        setDraw({ draw: rectangle, type: 'rectangle' });
        break;
      }
      case 'polygon': {
        const polygon = new Draw({
          geometryName: 'Polygon',
          type: 'Polygon',
        });
        setDraw({ draw: polygon, type: 'polygon' });
        break;
      }
      case 'circle': {
        const circle = new Draw({
          geometryName: 'Circle',
          type: 'Circle',
          freehand: true,
        });
        setDraw({ draw: circle, type: 'circle' });
        break;
      }
      default: {
        setDraw(undefined);
      }
    }
  }, [drawingTool, setDraw]);

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
      toggleDrawingToolShape,
      drawingTool,
    }),
    [draw, source, layer, setDraw, drawingTool, toggleDrawingToolShape]
  );
};

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
import { TVectorLayer } from './aoi-layer.component';
import { useCoordinateLabels } from './use-coordinate-labels.hook';

export type TDraw = { draw: Draw; type: 'rectangle' | 'polygon' | 'circle' };

export const useAoiLayer = () => {
  const map = useContext(MapContext);
  const { visible, shape, fitToAoi, setShape, toggleDrawingToolShape, setDrawingTool, drawingTool, setFitToAoi } =
    useAoi();
  const [draw, setDraw] = useState<TDraw | undefined>(undefined);
  const [layer, setLayer] = useState<TVectorLayer | undefined>(undefined);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);
  const { updateLabels, clearLabels } = useCoordinateLabels(map);
  const geometryChangeListenerRef = useRef<(() => void) | null>(null);

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
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape.shape);
    source?.addFeature(feature);

    if (fitToAoi) {
      fitToLayer(shape.shape.getExtent());
    }

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape?.shape, source, fitToAoi, fitToLayer]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }
    draw.draw.setActive(!!drawingTool?.enabled);
  }, [draw?.draw, drawingTool?.enabled]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    const handleDrawStart = (event: DrawEvent) => {
      setShape(undefined);
      clearLabels();

      // Clean up previous listener if exists
      if (geometryChangeListenerRef.current) {
        geometryChangeListenerRef.current();
        geometryChangeListenerRef.current = null;
      }

      const geometry = event.feature.getGeometry();
      if (geometry) {
        // Update labels immediately and on every geometry change
        updateLabels(geometry);

        const changeKey = geometry.on('change', () => {
          updateLabels(geometry);
        });

        geometryChangeListenerRef.current = () => {
          geometry.un('change', changeKey.listener);
        };
      }
    };

    const handleDrawEnd = (event: DrawEvent) => {
      // Clean up geometry change listener
      if (geometryChangeListenerRef.current) {
        geometryChangeListenerRef.current();
        geometryChangeListenerRef.current = null;
      }

      clearLabels();
      map.removeInteraction(draw.draw);
      setShape({ type: draw.type, shape: event.feature.getGeometry() });
      setDrawingTool(undefined);
    };

    draw.draw.on('drawstart', handleDrawStart);
    draw.draw.on('drawend', handleDrawEnd);
    map.addInteraction(draw.draw);

    return () => {
      // Clean up geometry change listener on unmount
      if (geometryChangeListenerRef.current) {
        geometryChangeListenerRef.current();
        geometryChangeListenerRef.current = null;
      }
      clearLabels();
      map.removeInteraction(draw.draw);
    };
  }, [map, draw, setShape, setDrawingTool, updateLabels, clearLabels]);

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

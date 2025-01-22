import { useMeasureDistance } from '@ukri/map/data-access-map';
import { MapBrowserEvent } from 'ol';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { Draw, Modify } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useContext, useEffect, useMemo, useState } from 'react';

import { measureDistanceLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';
import { KeyboardEventInteraction } from './interaction';
import { measureDistanceDrawingFinishedStyles } from './measure-distance.styles';

export type TVectorLayer = VectorLayer<Feature<Geometry>>;

export type TDraw = { draw: Draw; type: 'polygon' };

export const useMeasureDistanceLayer = () => {
  const map = useContext(MapContext);
  const { visible, shape, setShape } = useMeasureDistance();
  const [draw, setDraw] = useState<TDraw | undefined>(undefined);
  const [layer, setLayer] = useState<TVectorLayer | undefined>(undefined);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);
  const [modify, setModify] = useState<Modify | undefined>(undefined);

  useEffect(() => {
    const newSource = new VectorSource({ wrapX: false });
    const newLayer = new VectorLayer({
      source: newSource,
      zIndex: measureDistanceLayerZindex,
      style: measureDistanceDrawingFinishedStyles,
    });

    map.addLayer(newLayer);
    setSource(newSource);
    setLayer(newLayer);

    return () => {
      map.removeLayer(newLayer);
    };
  }, [map]);

  useEffect(() => {
    if (!source || !layer || !visible) {
      return;
    }

    const newModify = new Modify({ source, style: measureDistanceDrawingFinishedStyles });
    newModify.on('modifyend', (event) => {
      const geometry = [...event.features.getArray()].pop()?.getGeometry();
      setShape(geometry ? { type: 'polygon', shape: geometry } : undefined);
    });

    map.addInteraction(newModify);
    setModify(newModify);

    return () => {
      map.removeInteraction(newModify);
    };
  }, [map, source, layer, visible, setShape]);

  useEffect(() => {
    if (!shape?.shape) {
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape.shape);
    source?.addFeature(feature);

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape?.shape, source]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    const callback = (event: MapBrowserEvent<KeyboardEvent>) => {
      if (event.type === 'keydown') {
        const keyEvent = event.originalEvent;
        if (keyEvent.code?.toLowerCase() === 'escape') {
          draw?.draw.abortDrawing();
          keyEvent.preventDefault();
        }
      }

      return true;
    };
    const stopDrawing = (event: KeyboardEvent) => {
      if (event.type === 'keydown' && event.code?.toLowerCase() === 'escape') {
        draw?.draw.abortDrawing();
      }
    };
    const keyboardEventInteraction = new KeyboardEventInteraction(callback);

    draw.draw.on('drawstart', () => {
      setShape(undefined);
      document.addEventListener('keydown', stopDrawing);
    });
    draw.draw.on('drawend', (event: DrawEvent) => {
      setShape({ type: draw.type, shape: event.feature.getGeometry() });
      document.removeEventListener('keydown', stopDrawing);
    });
    map.addInteraction(draw.draw);
    // map.addInteraction(keyboardEventInteraction);

    return () => {
      map.removeInteraction(draw.draw);
      // map.removeInteraction(keyboardEventInteraction);
      document.removeEventListener('keydown', stopDrawing);
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
      modify,
    }),
    [layer, draw, source, modify]
  );
};

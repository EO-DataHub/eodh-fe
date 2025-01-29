import { useAoi, useMeasureDistance } from '@ukri/map/data-access-map';
import { TBaseUnit, useSettings } from '@ukri/shared/utils/settings';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { Draw, Modify } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useContext, useEffect, useMemo, useState } from 'react';

import { measureDistanceLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';
import { measureDistanceDrawingFinishedStyles } from './measure-distance.styles';

export type TVectorLayer = VectorLayer<Feature<Geometry>>;

export type TDrawType = 'polygon' | 'line';
export type TDraw = { draw: Draw; type: TDrawType };

export const useMeasureDistanceLayer = () => {
  const map = useContext(MapContext);
  const { visible, shape, setShape } = useMeasureDistance();
  const { measurementUnit } = useSettings();
  const { drawingTool } = useAoi();
  const [drawType, setDrawType] = useState<TDrawType>('line');
  const [unit, setUnit] = useState<TBaseUnit>(measurementUnit);
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

    const stopDrawing = (event: KeyboardEvent) => {
      if (event.type === 'keydown' && event.code?.toLowerCase() === 'escape') {
        draw?.draw.finishDrawing();
      }
    };

    const handleDoubleClickEvent = () => {
      draw?.draw.finishDrawing();
    };

    draw.draw.on('drawstart', () => {
      setShape(undefined);
      document.addEventListener('keydown', stopDrawing);
    });
    draw.draw.on('drawend', (event: DrawEvent) => {
      setShape({ type: draw.type, shape: event.feature.getGeometry() });
      document.removeEventListener('keydown', stopDrawing);
    });

    map.addInteraction(draw.draw);
    map.on('dblclick', handleDoubleClickEvent);

    return () => {
      map.removeInteraction(draw.draw);
      map.un('dblclick', handleDoubleClickEvent);
      document.removeEventListener('keydown', stopDrawing);
    };
  }, [map, draw, setShape]);

  useEffect(() => {
    if (!layer) {
      return;
    }

    layer.setVisible(visible);
  }, [layer, visible]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    draw.draw.setActive(!drawingTool?.enabled);
  }, [draw?.draw, drawingTool?.enabled]);

  return useMemo(
    () => ({
      layer,
      drawType,
      setDrawType,
      draw,
      setDraw,
      source,
      modify,
      unit,
      setUnit,
    }),
    [layer, drawType, setDrawType, draw, setDraw, source, modify, unit, setUnit]
  );
};

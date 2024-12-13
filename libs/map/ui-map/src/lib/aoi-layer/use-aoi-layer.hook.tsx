import { useAoi } from '@ukri/map/data-access-map';
import { Extent } from 'ol/extent';
import Feature from 'ol/Feature';
import { Draw } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { aoiLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { TVectorLayer } from './aoi-layer.component';

export type TDraw = { draw: Draw; type: 'rectangle' | 'polygon' | 'circle' };

export const useAoiLayer = () => {
  const map = useContext(MapContext);
  const { visible, shape, fitToAoi, setShape } = useAoi();
  const [draw, setDraw] = useState<TDraw | undefined>(undefined);
  const [layer, setLayer] = useState<TVectorLayer | undefined>(undefined);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);

  const fitToLayer = useCallback(
    (extent: Extent) => {
      if (!layer || !fitToAoi || !extent) {
        return;
      }

      const view = map.getView();
      const zoom = view.getZoom();

      view.fit(extent);

      if (zoom) {
        view.setZoom(zoom - 1);
      }
    },
    [fitToAoi, layer, map]
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
    if (!shape?.shape) {
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape.shape);
    source?.addFeature(feature);
    fitToLayer(shape.shape.getExtent());

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape?.shape, source, fitToLayer]);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    draw.draw.on('drawstart', () => setShape(undefined));
    draw.draw.on('drawend', (event: DrawEvent) => {
      map.removeInteraction(draw.draw);
      setShape({ type: draw.type, shape: event.feature.getGeometry() });
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

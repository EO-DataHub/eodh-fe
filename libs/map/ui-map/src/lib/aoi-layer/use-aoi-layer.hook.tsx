import { useAoiLayerVisible, useCurrentAoi, useCurrentAoiMutation } from '@ukri/map/data-access-map';
import Feature from 'ol/Feature';
import { Draw } from 'ol/interaction.js';
import { DrawEvent } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { useContext, useEffect, useMemo, useState } from 'react';

import { aoiLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { TVectorLayer } from './aoi-layer.component';

export type TDraw = { draw: Draw; type: 'rectangle' | 'polygon' | 'circle' };

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

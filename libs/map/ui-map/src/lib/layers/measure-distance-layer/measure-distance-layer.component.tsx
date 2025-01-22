import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { Modify } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createContext, PropsWithChildren } from 'react';

import { TDraw, useMeasureDistanceLayer } from './measure-distance-layer.hook';

export type TVectorLayer = VectorLayer<Feature<Geometry>>;

export type TMeasureDistanceLayer = {
  source: VectorSource | undefined;
  layer: TVectorLayer | undefined;
  draw: TDraw | undefined;
  modify: Modify | undefined;
  setDraw: (draw: TDraw | undefined) => void;
};

const defaultValues: TMeasureDistanceLayer = {
  source: undefined,
  layer: undefined,
  draw: undefined,
  modify: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDraw: () => {},
};

export const MeasureDistanceLayerContext = createContext<TMeasureDistanceLayer>(defaultValues);

export const MeasureDistanceLayer = ({ children }: PropsWithChildren) => {
  const { source, layer, draw, modify, setDraw } = useMeasureDistanceLayer();

  return (
    <MeasureDistanceLayerContext.Provider value={{ source, layer, draw, modify, setDraw }}>
      {children}
    </MeasureDistanceLayerContext.Provider>
  );
};

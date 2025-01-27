import { TBaseUnit } from '@ukri/shared/utils/settings';
import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import { Modify } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createContext, PropsWithChildren } from 'react';

import { TDraw, useMeasureDistanceLayer } from './measure-distance-layer.hook';

export type TVectorLayer = VectorLayer<Feature<Geometry>>;

export type TMeasureDistanceLayer = {
  unit: TBaseUnit;
  source: VectorSource | undefined;
  layer: TVectorLayer | undefined;
  draw: TDraw | undefined;
  drawType: 'polygon' | 'line';
  modify: Modify | undefined;
  setDraw: (draw: TDraw | undefined) => void;
  setDrawType: (drawType: 'polygon' | 'line') => void;
  setUnit: (unit: TBaseUnit) => void;
};

const defaultValues: TMeasureDistanceLayer = {
  unit: 'km',
  source: undefined,
  layer: undefined,
  draw: undefined,
  drawType: 'polygon',
  modify: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDraw: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUnit: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDrawType: () => {},
};

export const MeasureDistanceLayerContext = createContext<TMeasureDistanceLayer>(defaultValues);

export const MeasureDistanceLayer = ({ children }: PropsWithChildren) => {
  const { unit, source, layer, draw, drawType, modify, setDraw, setDrawType, setUnit } = useMeasureDistanceLayer();

  return (
    <MeasureDistanceLayerContext.Provider
      value={{ unit, source, layer, draw, drawType, modify, setDraw, setDrawType, setUnit }}
    >
      {children}
    </MeasureDistanceLayerContext.Provider>
  );
};

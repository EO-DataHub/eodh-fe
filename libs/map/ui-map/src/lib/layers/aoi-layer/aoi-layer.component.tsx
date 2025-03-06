import Feature from 'ol/Feature';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createContext, PropsWithChildren } from 'react';

import { EditModeProvider } from './edit-mode/edit-mode.context';
import { TDraw, useAoiLayer } from './use-aoi-layer.hook';

export type TVectorLayer = VectorLayer<Feature<Geometry>>;

export type TAoiLayer = {
  source: VectorSource | undefined;
  layer: TVectorLayer | undefined;
  draw: TDraw | undefined;
  setDraw: (draw: TDraw | undefined) => void;
  toggleDrawingToolShape: (shape: 'rectangle' | 'polygon' | 'circle' | 'line') => void;
  drawingTool: { enabled: boolean; type: 'rectangle' | 'polygon' | 'circle' | 'line' } | undefined;
};

const defaultValues: TAoiLayer = {
  source: undefined,
  layer: undefined,
  draw: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDraw: () => {},
  drawingTool: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleDrawingToolShape: () => {},
};

export const AoiLayerContext = createContext<TAoiLayer>(defaultValues);

export const AoiLayer = ({ children }: PropsWithChildren) => {
  const { source, layer, draw, setDraw, drawingTool, toggleDrawingToolShape } = useAoiLayer();

  return (
    <AoiLayerContext.Provider value={{ source, layer, draw, setDraw, toggleDrawingToolShape, drawingTool }}>
      <EditModeProvider>{children}</EditModeProvider>
    </AoiLayerContext.Provider>
  );
};

import { createContext, PropsWithChildren, useState } from 'react';

import { TDraw, useAioLayer } from './use-aoi-layer.hook';

export const AoiLayerContext = createContext<{ draw: TDraw | undefined; setDraw: (draw: TDraw) => void }>({
  draw: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDraw: () => {},
});

export const AoiLayer = ({ children }: PropsWithChildren) => {
  const [currentDraw, setCurrentDraw] = useState<TDraw | undefined>(undefined);
  useAioLayer({ draw: currentDraw, setDraw: setCurrentDraw });

  return (
    <AoiLayerContext.Provider value={{ draw: currentDraw, setDraw: setCurrentDraw }}>
      {children}
    </AoiLayerContext.Provider>
  );
};

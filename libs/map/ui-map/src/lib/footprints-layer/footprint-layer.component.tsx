import { PropsWithChildren } from 'react';

import { useFootprintLayer } from './use-footprint-layer.hook';

export const FootprintLayerComponent = ({ children }: PropsWithChildren) => {
  useFootprintLayer();

  return children;
};

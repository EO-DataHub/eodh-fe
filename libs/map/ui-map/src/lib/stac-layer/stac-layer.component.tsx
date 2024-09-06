import { PropsWithChildren } from 'react';

import { useStacLayer } from './use-stac-layer.hook';

export const StacLayer = ({ children }: PropsWithChildren) => {
  useStacLayer();

  return children;
};

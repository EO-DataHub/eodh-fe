import { PropsWithChildren } from 'react';

import { useStacLayer } from './use-stac-layer.hook';

export const TrueColorImageLayer = ({ children }: PropsWithChildren) => {
  useStacLayer();

  return children;
};

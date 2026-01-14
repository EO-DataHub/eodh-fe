import { PropsWithChildren } from 'react';

import { useStacLayer } from './use-stac-layer.hook';
import { useStacLayerClick } from './use-stac-layer-click.hook';

export const TrueColorImageLayer = ({ children }: PropsWithChildren) => {
  useStacLayer();
  useStacLayerClick();

  return children;
};

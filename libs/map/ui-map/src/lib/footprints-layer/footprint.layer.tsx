import { PropsWithChildren } from 'react';

import { useFootprintLayer } from './use-footprint-layer.hook';

type TFootprintLayerProps = PropsWithChildren<{ id?: string }>;

export const FootprintLayer = ({ children, id }: TFootprintLayerProps) => {
  useFootprintLayer(id);

  return children;
};

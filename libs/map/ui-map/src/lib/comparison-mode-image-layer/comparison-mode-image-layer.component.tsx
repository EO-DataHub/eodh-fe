import { PropsWithChildren } from 'react';

import { useComparisonModeImageLayers } from './use-comparison-mode-image-layer.hook';

export const ComparisonModeImageLayer = ({ children }: PropsWithChildren) => {
  useComparisonModeImageLayers();

  return <div className='map-container'>{children}</div>;
};

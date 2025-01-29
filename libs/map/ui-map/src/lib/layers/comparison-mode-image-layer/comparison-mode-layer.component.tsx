import { PropsWithChildren } from 'react';

import { ComparisonToolSlider } from './comparison-tool-slider/comparison-tool-slider.component';
import { ComparisonContext, useComparisonModeImageLayers } from './use-comparison-mode-image-layer.hook';

export const ComparisonModeLayer = ({ children }: PropsWithChildren) => {
  const { item1, item2 } = useComparisonModeImageLayers();

  return (
    <ComparisonContext.Provider value={{ item1, item2 }}>
      <div>{children}</div>
      <ComparisonToolSlider className='z-10' />
    </ComparisonContext.Provider>
  );
};

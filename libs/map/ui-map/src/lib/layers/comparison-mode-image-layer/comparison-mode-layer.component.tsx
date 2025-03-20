import { PropsWithChildren } from 'react';

import { ComparisonToolSlider } from './comparison-tool-slider/comparison-tool-slider.component';
import { ComparisonContext, useComparisonModeImageLayers } from './use-comparison-mode-image-layer.hook';

export const ComparisonModeLayer = ({ children }: PropsWithChildren) => {
  const { item1, item2, isItem1Visible, isItem2Visible } = useComparisonModeImageLayers();

  return (
    <ComparisonContext.Provider value={{ item1, item2, isItem1Visible, isItem2Visible }}>
      <div>{children}</div>
      <ComparisonToolSlider className='z-10' />
    </ComparisonContext.Provider>
  );
};

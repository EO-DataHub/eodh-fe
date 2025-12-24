import { twMerge } from '@ukri/shared/design-system';

import { IImageLegendProps } from '../legend.types';
import { legendPanelStyles } from '../legend-panel/legend-panel.styles';
import { imageLegendStyles } from './image-legend.styles';

export const ImageLegend = ({ src, alt, className }: IImageLegendProps) => {
  return (
    <div className={twMerge(imageLegendStyles.container, legendPanelStyles.contentPadding, className)}>
      <img src={src} alt={alt} className={imageLegendStyles.image} />
    </div>
  );
};

import clsx from 'clsx';

import { IImageLegendProps } from '../legend.types';
import { imageLegendStyles } from './image-legend.styles';

export const ImageLegend = ({ src, alt, className }: IImageLegendProps) => {
  return (
    <div className={clsx(imageLegendStyles.container, className)}>
      <img src={src} alt={alt} className={imageLegendStyles.image} />
    </div>
  );
};

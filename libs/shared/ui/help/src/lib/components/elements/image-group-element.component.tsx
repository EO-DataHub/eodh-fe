import { IImageGroupElement } from '../../types/help-config.types';
import { ImageElement } from './image-element.component';

interface IImageGroupElementProps {
  readonly element: IImageGroupElement;
  readonly pathToImages?: string;
}

export const ImageGroupElement = ({ element, pathToImages }: IImageGroupElementProps) => {
  const isVertical = element.layout === 'vertical';
  const containerClass = isVertical ? 'flex flex-col gap-4' : 'flex flex-row flex-wrap gap-4';

  return (
    <div className={containerClass}>
      {element.images.map((image, index) => (
        <ImageElement key={index} element={{ type: 'image', ...image }} pathToImages={pathToImages} />
      ))}
    </div>
  );
};

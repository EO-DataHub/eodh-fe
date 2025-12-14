import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { IImageElement } from '../../types/help-config.types';

interface IImageElementProps {
  readonly element: IImageElement;
  readonly pathToImages?: string;
}

export const ImageElement = ({ element, pathToImages }: IImageElementProps) => {
  const { t } = useTranslation();
  const imageSrc = pathToImages ? `${pathToImages}/${element.src}` : element.src;

  return (
    <div className='my-3'>
      {element.descriptionAbove && (
        <Text content={t(element.descriptionAbove)} fontSize='medium' fontWeight='regular' className='mb-2' />
      )}
      <img src={imageSrc} alt={t(element.alt)} className='object-cover' />
      {element.caption && (
        <Text content={t(element.caption)} fontSize='small' fontWeight='regular' className='mt-1 text-neutral-dark' />
      )}
    </div>
  );
};

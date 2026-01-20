import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { IImageGroupElement } from '../../help-config.types';

interface IImageGroupElementProps {
  readonly element: IImageGroupElement;
  readonly pathToImages?: string;
}

const styles = {
  listItem: 'relative before:content-["•"] before:absolute before:left-[-12px] before:top-[-3px] ml-4',
};

export const ImageGroupElement = ({ element, pathToImages }: IImageGroupElementProps) => {
  const { t } = useTranslation();

  return (
    <ul>
      {element.images.map((image, index) => {
        const imageSrc = pathToImages ? `${pathToImages}/${image.src}` : image.src;
        const isListItem = image.display === 'list-item';

        return (
          <div key={index}>
            <div className={isListItem ? styles.listItem : undefined}>
              <div className='my-3'>
                {image.descriptionAbove && (
                  <Text
                    content={t(image.descriptionAbove)}
                    fontSize='medium'
                    fontWeight='regular'
                    className='mb-2 whitespace-pre-line'
                  />
                )}
                <img src={imageSrc} alt={t(image.alt)} className='object-cover' />
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { IStyledTextElement } from '../../types/help-config.types';

interface IStyledTextElementProps {
  readonly element: IStyledTextElement;
}

export const StyledTextElement = ({ element }: IStyledTextElementProps) => {
  const { t } = useTranslation();

  return (
    <p className='mb-2'>
      {element.segments.map((segment, index) => {
        const translatedText = t(segment.text);

        switch (segment.style) {
          case 'bold':
            return <Text key={index} content={translatedText} fontSize='medium' fontWeight='bold' type='span' />;
          case 'italic':
            return (
              <Text
                key={index}
                content={translatedText}
                fontSize='medium'
                fontWeight='regular'
                type='span'
                className='italic'
              />
            );
          case 'underline':
            return (
              <Text
                key={index}
                content={translatedText}
                fontSize='medium'
                fontWeight='regular'
                type='span'
                className='underline'
              />
            );
          default:
            return <Text key={index} content={translatedText} fontSize='medium' fontWeight='regular' type='span' />;
        }
      })}
    </p>
  );
};

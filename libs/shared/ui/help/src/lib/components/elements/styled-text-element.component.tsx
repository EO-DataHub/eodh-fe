import { useTranslation } from 'react-i18next';

import { IStyledTextElement } from '../../types/help-config.types';

interface IStyledTextElementProps {
  readonly element: IStyledTextElement;
}

export const StyledTextElement = ({ element }: IStyledTextElementProps) => {
  const { t } = useTranslation();

  const hasMultipleSegments = element.segments.length > 1;

  if (hasMultipleSegments) {
    return (
      <p className='mb-2'>
        {element.segments.map((segment, index) => {
          const content = t(segment.text);
          switch (segment.style) {
            case 'bold':
              return (
                <span key={index} className='text-medium-bold'>
                  {content}
                </span>
              );
            case 'italic':
              return <em key={index}>{content}</em>;
            case 'underline':
              return <u key={index}>{content}</u>;
            default:
              return (
                <span key={index} className='text-medium-regular'>
                  {content}
                </span>
              );
          }
        })}
      </p>
    );
  }

  return (
    <p className='text-medium-regular mb-2 whitespace-pre-line'>
      {element.segments.map((segment, index) => {
        const content = t(segment.text);
        switch (segment.style) {
          case 'bold':
            return <strong key={index}>{content}</strong>;
          case 'italic':
            return <em key={index}>{content}</em>;
          case 'underline':
            return <u key={index}>{content}</u>;
          default:
            return <span key={index}>{content}</span>;
        }
      })}
    </p>
  );
};

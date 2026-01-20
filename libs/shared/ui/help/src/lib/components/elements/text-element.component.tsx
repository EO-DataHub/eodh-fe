import { Text } from '@ukri/shared/design-system';
import { Trans } from 'react-i18next';

import { ITextElement } from '../../types/help-config.types';

interface ITextElementProps {
  readonly element: ITextElement;
}

const styles = {
  listItem: 'relative before:content-["•"] before:absolute before:left-[-12px] before:top-[-3px] ml-4',
};

const Link = ({ href, children }: { href?: string; children?: React.ReactNode }) => {
  return (
    <a href={href} target='_blank' className='text-primary-main underline' rel='noreferrer'>
      {children}
    </a>
  );
};

export const TextElement = ({ element }: ITextElementProps) => {
  const isListItem = element.display === 'list-item';

  const content = (
    <Text
      content={
        <Trans
          i18nKey={element.content}
          components={{
            Link: <Link />,
            strong: <strong className='font-semibold' />,
          }}
        />
      }
      fontSize='medium'
      fontWeight='regular'
      className='mb-2 whitespace-pre-line'
    />
  );

  if (isListItem) {
    return <div className={styles.listItem}>{content}</div>;
  }

  return content;
};

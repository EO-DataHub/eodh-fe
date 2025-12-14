import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { ILinksGroupElement } from '../../types/help-config.types';
import { LinkElement } from './link-element.component';

interface ILinksGroupElementProps {
  readonly element: ILinksGroupElement;
}

export const LinksGroupElement = ({ element }: ILinksGroupElementProps) => {
  const { t } = useTranslation();

  return (
    <div>
      {element.title && <Text content={t(element.title)} fontSize='medium' fontWeight='semibold' className='mb-2' />}
      <ul>
        {element.links.map((link, index) => (
          <li key={index} className='ml-4'>
            <LinkElement element={{ type: 'link', ...link }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

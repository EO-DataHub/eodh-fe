import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { ILinksGroupElement } from '../../help-config.types';

interface ILinksGroupElementProps {
  readonly element: ILinksGroupElement;
}

const styles = {
  listItem: 'relative before:content-["•"] before:absolute before:left-[-12px] before:top-[-3px] ml-4',
};

export const LinksGroupElement = ({ element }: ILinksGroupElementProps) => {
  const { t } = useTranslation();

  return (
    <>
      {element.title && (
        <Text content={t(element.title)} fontSize='medium' fontWeight='regular' className='mb-2 whitespace-pre-line' />
      )}
      <ul>
        {element.links.map((link, index) => (
          <div key={index}>
            <div className={styles.listItem}>
              <div>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noreferrer'
                  className='text-primary visited:text-purple-600 hover:text-primary-dark'
                >
                  <Text content={t(link.text)} fontSize='medium' fontWeight='regular' />
                </a>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </>
  );
};

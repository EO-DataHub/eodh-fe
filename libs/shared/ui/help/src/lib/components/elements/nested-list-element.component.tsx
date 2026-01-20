import { Text } from '@ukri/shared/design-system';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { INestedListElement } from '../../types/help-config.types';

interface INestedListElementProps {
  readonly element: INestedListElement;
}

const styles = {
  listItem: 'relative before:content-["•"] before:absolute before:left-[-12px] before:top-[-3px] ml-4',
  nestedListItem:
    'before:inline-block before:w-1 before:h-1 before:mr-3 before:mt-2 before:border-[1px] before:border-text-primary before:rounded-full before:left-5 pl-8 flex',
};

export const NestedListElement = ({ element }: INestedListElementProps) => {
  const { t } = useTranslation();

  return (
    <ul>
      {element.items.map((item, index) => (
        <Fragment key={index}>
          <div>
            <div className={styles.listItem}>
              <Text
                content={t(item.content)}
                fontSize='medium'
                fontWeight='regular'
                className='mb-2 whitespace-pre-line'
              />
            </div>
          </div>
          {item.subItems && item.subItems.length > 0 && (
            <div>
              <ul>
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className={styles.nestedListItem}>
                    <Text
                      content={t(subItem)}
                      fontSize='medium'
                      fontWeight='regular'
                      className='mb-2 whitespace-pre-line'
                    />
                  </div>
                ))}
              </ul>
            </div>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

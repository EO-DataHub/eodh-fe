import { Text } from '@ukri/shared/design-system';
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
        <li key={index} className={styles.listItem}>
          <Text content={t(item.content)} fontSize='medium' fontWeight='regular' />
          {item.subItems && item.subItems.length > 0 && (
            <ul>
              {item.subItems.map((subItem, subIndex) => (
                <li key={subIndex} className={styles.nestedListItem}>
                  <Text content={t(subItem)} fontSize='medium' fontWeight='regular' />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

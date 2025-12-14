import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { IListElement } from '../../types/help-config.types';

interface IListElementProps {
  readonly element: IListElement;
}

const styles = {
  listItem: 'relative before:content-["•"] before:absolute before:left-[-12px] before:top-[-3px] ml-4',
  numberedItem: 'ml-4',
};

export const ListElement = ({ element }: IListElementProps) => {
  const { t } = useTranslation();
  const isNumbered = element.variant === 'numbered';
  const ListTag = isNumbered ? 'ol' : 'ul';

  return (
    <ListTag className={isNumbered ? 'list-decimal ml-4' : ''}>
      {element.items.map((item, index) => (
        <li key={index} className={isNumbered ? styles.numberedItem : styles.listItem}>
          <Text content={t(item)} fontSize='medium' fontWeight='regular' />
        </li>
      ))}
    </ListTag>
  );
};

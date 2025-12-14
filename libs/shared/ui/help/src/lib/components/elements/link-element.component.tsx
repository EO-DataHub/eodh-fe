import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { ILinkElement } from '../../types/help-config.types';

interface ILinkElementProps {
  readonly element: ILinkElement;
}

const styles = {
  link: 'text-primary visited:text-purple-600 hover:text-primary-dark',
};

export const LinkElement = ({ element }: ILinkElementProps) => {
  const { t } = useTranslation();

  return (
    <a className={styles.link} href={element.href} target='_blank' rel='noreferrer'>
      <Text content={t(element.text)} fontSize='medium' fontWeight='regular' />
    </a>
  );
};

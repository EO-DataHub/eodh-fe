import { IconsNames } from '@ukri/shared/design-system';
import { Icon, Text } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

import { styles } from './modal.styles';

interface IModalProps {
  header: string;
  content: string | JSX.Element;
  icon?: keyof typeof IconsNames;
  ctaButtons?: JSX.Element;
  onClose?: () => void;
}

export const Modal = ({
  header,
  content,
  icon = 'Info',
  ctaButtons,
  onClose,
  children,
}: PropsWithChildren<IModalProps>) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={styles.infoIconContainer}>
            <Icon name={icon} className={styles.infoIcon} width={28} height={28} />
          </div>
          <div className={styles.body}>
            <Text content={header} type='h3' fontSize='large' fontWeight='semibold' className='text-text' />
            <Text content={content} type='p' fontSize='medium' fontWeight='regular' className='text-text' />
            {children}
          </div>
        </div>
        {ctaButtons && <div className={styles.buttonsContainer}>{ctaButtons}</div>}
        <Icon
          name='Close'
          width={24}
          height={24}
          className='absolute top-[30px] right-[30px] p-0.5 text-text-primary cursor-pointer hover:bg-bright-dark rounded-2xl'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

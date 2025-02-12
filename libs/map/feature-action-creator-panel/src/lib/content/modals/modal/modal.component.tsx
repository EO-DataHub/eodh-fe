import { IconsNames } from '@ukri/shared/design-system';
import { Icon, Text } from '@ukri/shared/design-system';

import { styles } from './modal.styles';

interface IModalProps {
  header: string;
  content: string | JSX.Element;
  remainingContent?: JSX.Element;
  icon?: keyof typeof IconsNames;
  ctaButtons?: JSX.Element;
  bottomContent?: JSX.Element;
}

export const Modal = ({ header, content, icon = 'Info', ctaButtons, remainingContent, bottomContent }: IModalProps) => {
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
            {remainingContent && remainingContent}
          </div>
        </div>
        {ctaButtons && <div className={styles.buttonsContainer}>{ctaButtons}</div>}
        {bottomContent && <div>{bottomContent}</div>}
      </div>
    </div>
  );
};

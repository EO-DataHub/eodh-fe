import { Icon, Text } from '@ukri/shared/design-system';
import { Help } from '@ukri/shared/ui/help';

import { styles } from './help-modal.styles';
import { helpContentTranslationKeys, translationPath } from './translation-keys';
interface IModalProps {
  onClose: () => void;
}

export const HelpModal = ({ onClose }: IModalProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Text
            type='h1'
            content={`${translationPath}.TITLE`}
            fontSize='large'
            fontWeight='bold'
            className={styles.helpTitle}
          />
          <button onClick={onClose} className={styles.closeIcon}>
            <Icon name='Close' />
          </button>
        </div>
        <div className={styles.content}>
          <Help translationPath={translationPath} helpContentTranslationKeys={helpContentTranslationKeys} />
        </div>
      </div>
    </div>
  );
};

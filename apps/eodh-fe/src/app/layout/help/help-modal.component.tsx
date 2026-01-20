import { Icon, Text } from '@ukri/shared/design-system';
import { Help } from '@ukri/shared/ui/help';

import { generalHelpConfig } from '../../help/general-help.config';
import { styles } from './help-modal.styles';

interface IModalProps {
  readonly onClose: () => void;
}

export const HelpModal = ({ onClose }: IModalProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Text
            type='h1'
            content='APP.HELP.GENERAL_HELP.TITLE'
            fontSize='large'
            fontWeight='bold'
            className={styles.helpTitle}
          />
          <button onClick={onClose} className={styles.closeIcon}>
            <Icon name='Close' />
          </button>
        </div>
        <div className={styles.content}>
          <Help config={generalHelpConfig} className={styles.helpContent} />
        </div>
      </div>
    </div>
  );
};

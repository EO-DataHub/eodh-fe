import { useActionCreator } from '@ukri/map/data-access-map';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { ActionCreator } from '../../../action-creator-panel.context';
import { styles } from './workflow-processing-modal.styles';

export const WorkflowProcessingSuccessModal = () => {
  const { setActiveTab } = useContext(ActionCreator);
  const { reset } = useActionCreator();

  const goToHistoryTab = useCallback(() => {
    reset();
    setActiveTab('history');
  }, [reset, setActiveTab]);

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={styles.infoIconContainer}>
            <Icon name='Info' className={styles.infoIcon} width={28} height={28} />
          </div>
          <div className={styles.body}>
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.SUCCESS.HEADER'
              type='h3'
              fontSize='large'
              fontWeight='semibold'
              className='text-text'
            />
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.SUCCESS.CONTENT.INFORMATION'
              type='p'
              fontSize='medium'
              fontWeight='regular'
              className='text-text'
            />
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.SUCCESS.CONTENT.BROWSE_DATA'
              type='p'
              fontSize='medium'
              fontWeight='regular'
              className='text-text'
            />
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.SUCCESS.BUTTON.EXPORT_CONFIGURATION'
            iconName='Upload'
            appearance='outlined'
            size='small'
            iconWidth={20}
            iconHeight={20}
            disabled={true}
          />
          <Button
            text='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.SUCCESS.BUTTON.VIEW_HISTORY'
            size='small'
            onClick={goToHistoryTab}
          />
        </div>
      </div>
    </div>
  );
};

import { Icon, LoadingSpinner, Text } from '@ukri/shared/design-system';

import { styles } from './workflow-processing-modal.styles';

export const WorkflowProcessingInProgressModal = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={styles.infoIconContainer}>
            <Icon name='Info' className={styles.infoIcon} width={28} height={28} />
          </div>
          <div className={styles.body}>
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.IN_PROGRESS.HEADER'
              type='h3'
              fontSize='large'
              fontWeight='semibold'
              className='text-text'
            />
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.IN_PROGRESS.CONTENT'
              type='p'
              fontSize='medium'
              fontWeight='regular'
              className='text-text'
            />
          </div>
        </div>
        <div className='flex w-full justify-center mt-4'>
          <LoadingSpinner />
        </div>
      </div>
    </div>
  );
};

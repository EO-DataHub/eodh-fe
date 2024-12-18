import { LoadingSpinner } from '@ukri/shared/design-system';

import { Modal } from '../modal/modal.component';

export const WorkflowProcessingInProgressModal = () => {
  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.IN_PROGRESS.HEADER'
      content='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.IN_PROGRESS.CONTENT'
      bottomContent={
        <div className='flex w-full justify-center mt-4'>
          <LoadingSpinner />
        </div>
      }
    />
  );
};

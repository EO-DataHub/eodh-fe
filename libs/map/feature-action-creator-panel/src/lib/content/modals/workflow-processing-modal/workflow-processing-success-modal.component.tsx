import { useActionCreator } from '@ukri/map/data-access-map';
import { Button, Text } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { ActionCreator } from '../../../action-creator-panel.context';
import { Modal } from '../modal/modal.component';

export const WorkflowProcessingSuccessModal = () => {
  const { setActiveTab } = useContext(ActionCreator);
  const { reset, exportWorkflow } = useActionCreator();

  const goToHistoryTab = useCallback(() => {
    reset();
    setActiveTab('history');
  }, [reset, setActiveTab]);

  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.SUCCESS.HEADER'
      content='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.SUCCESS.CONTENT.INFORMATION'
      remainingContent={
        <Text
          content='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.SUCCESS.CONTENT.BROWSE_DATA'
          type='p'
          fontSize='medium'
          fontWeight='regular'
          className='text-text'
        />
      }
      ctaButtons={
        <>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.SUCCESS.BUTTON.EXPORT_CONFIGURATION'
            iconName='Upload'
            appearance='outlined'
            size='medium'
            iconWidth={20}
            iconHeight={20}
            onClick={exportWorkflow}
            className='!py-0.5'
          />
          <Button
            text='MAP.ACTION_CREATOR_PANEL.MODALS.WORKFLOW_PROCESSING_MODAL.SUCCESS.BUTTON.VIEW_HISTORY'
            size='medium'
            onClick={goToHistoryTab}
          />
        </>
      }
    />
  );
};

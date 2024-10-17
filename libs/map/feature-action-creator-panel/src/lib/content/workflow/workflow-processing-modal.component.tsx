import { useActionCreator } from '@ukri/map/data-access-map';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { ActionCreator } from '../../action-creator-panel.context';

export const WorkflowProcessingModal = () => {
  const { setActiveTab } = useContext(ActionCreator);
  const { reset } = useActionCreator();

  const goToHistoryTab = useCallback(() => {
    reset();
    setActiveTab('history');
  }, [reset, setActiveTab]);

  return (
    <div className='bg-opacity-20 bg-black absolute top-0 left-0 w-full h-full max-h-full max-w-full overflow-hidden flex items-center justify-center'>
      <div className='mx-8 p-8 bg-bright-light rounded-lg'>
        <div className='flex flex-row'>
          <div className='mr-5'>
            <Icon name='Info' className='text-neutral-light' width={28} height={28} />
          </div>
          <div className='flex flex-col gap-4'>
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.HEADER'
              type='h3'
              fontSize='large'
              fontWeight='semibold'
              className='text-text'
            />
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.CONTENT.INFORMATION'
              type='p'
              fontSize='medium'
              fontWeight='regular'
              className='text-text'
            />
            <Text
              content='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.CONTENT.BROWSE_DATA'
              type='p'
              fontSize='medium'
              fontWeight='regular'
              className='text-text'
            />
          </div>
        </div>
        <div className='flex mt-5 gap-2 justify-end'>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.BUTTON.EXPORT_CONFIGURATION'
            iconName='Upload'
            appearance='outlined'
            size='small'
            iconWidth={20}
            iconHeight={20}
            disabled={true}
          />
          <Button
            text='MAP.ACTION_CREATOR_PANEL.WORKFLOW.WORKFLOW_PROCESSING_MODAL.BUTTON.VIEW_HISTORY'
            size='small'
            onClick={goToHistoryTab}
          />
        </div>
      </div>
    </div>
  );
};

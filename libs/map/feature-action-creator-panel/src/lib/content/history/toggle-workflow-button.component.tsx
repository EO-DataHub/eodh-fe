import { Button, LoadingSpinner } from '@ukri/shared/design-system';

interface IToggleWorkflowButtonProps {
  selectedWorkflowId: string | null;
  selected: boolean;
  workflowStatus: 'READY' | 'PROCESSING' | 'FAILED' | undefined;
  loadResultsStatus: 'pending' | 'error' | 'success';
  onShow: () => void;
  onHide: () => void;
}

export const ToggleWorkflowButton = ({
  selectedWorkflowId,
  selected,
  workflowStatus,
  loadResultsStatus,
  onShow,
  onHide,
}: IToggleWorkflowButtonProps) => {
  if (workflowStatus === 'FAILED') {
    return null;
  }

  if (!selectedWorkflowId || !selected) {
    return (
      <Button
        text='MAP.ACTION_CREATOR_PANEL.HISTORY.VIEW_RESULTS'
        size='medium'
        onClick={onShow}
        disabled={workflowStatus === 'PROCESSING'}
      />
    );
  }

  switch (loadResultsStatus) {
    case 'success': {
      return (
        <Button
          text='MAP.ACTION_CREATOR_PANEL.HISTORY.HIDE_RESULTS'
          size='medium'
          onClick={onHide}
          disabled={workflowStatus === 'PROCESSING'}
        />
      );
    }

    case 'error': {
      return (
        <Button
          text='MAP.ACTION_CREATOR_PANEL.HISTORY.HIDE_RESULTS'
          size='medium'
          onClick={onHide}
          disabled={workflowStatus === 'PROCESSING'}
        />
      );
    }

    case 'pending': {
      return <Button text={<LoadingSpinner size='xs' />} size='medium' disabled={true} />;
    }
  }
};

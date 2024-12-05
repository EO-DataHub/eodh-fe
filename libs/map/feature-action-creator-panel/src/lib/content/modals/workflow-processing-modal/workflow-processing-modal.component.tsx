import { WorkflowProcessingInProgressModal } from './workflow-processing-in-progress-modal.component';
import { WorkflowProcessingSuccessModal } from './workflow-processing-success-modal.component';

type TWorkflowProcessingModalProps = {
  status: 'error' | 'pending' | 'success' | 'idle';
};

export const WorkflowProcessingModal = ({ status }: TWorkflowProcessingModalProps) => {
  switch (status) {
    case 'pending': {
      return <WorkflowProcessingInProgressModal />;
    }

    case 'success': {
      return <WorkflowProcessingSuccessModal />;
    }

    case 'idle':
    default: {
      return null;
    }
  }
};

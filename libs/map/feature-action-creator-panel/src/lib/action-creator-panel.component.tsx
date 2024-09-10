import { ActionCreator } from './action-creator.component';
import { ActionCreatorProvider } from './action-creator-panel.context';

export const ActionCreatorPanel = () => {
  return (
    <ActionCreatorProvider>
      <ActionCreator className='absolute top-5 right-5 z-50' />
    </ActionCreatorProvider>
  );
};

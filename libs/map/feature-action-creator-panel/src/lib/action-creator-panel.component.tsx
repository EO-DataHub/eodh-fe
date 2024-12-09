import { ActionCreator } from './action-creator.component';
import { ActionCreatorProvider } from './action-creator-panel.context';

interface IActionCreatorPanelProps {
  className?: string;
}

export const ActionCreatorPanel = ({ className }: IActionCreatorPanelProps) => {
  return (
    <ActionCreatorProvider>
      <ActionCreator className={`absolute top-5 right-5 ${className}`} />
    </ActionCreatorProvider>
  );
};

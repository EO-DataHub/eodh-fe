import { IHelpConfig } from '@ukri/shared/ui/help';

import { ActionCreator } from './action-creator.component';
import { ActionCreatorProvider } from './action-creator-panel.context';

export interface IActionCreatorPanelProps {
  readonly className?: string;
  readonly helpConfig: IHelpConfig;
}

export const ActionCreatorPanel = ({ className, helpConfig }: IActionCreatorPanelProps) => {
  return (
    <ActionCreatorProvider>
      <ActionCreator className={`absolute top-5 right-5 ${className}`} helpConfig={helpConfig} />
    </ActionCreatorProvider>
  );
};

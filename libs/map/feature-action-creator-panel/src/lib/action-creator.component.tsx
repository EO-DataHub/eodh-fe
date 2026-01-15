import { IHelpConfig } from '@ukri/shared/ui/help';

import { ActionCreatorProvider } from './action-creator-panel.context';
import { Content } from './content/content.component';
import { Header } from './header/header.component';

interface IActionCreatorProps {
  readonly className?: string;
  readonly helpConfig: IHelpConfig;
}

export const ActionCreator = ({ className = '', helpConfig }: IActionCreatorProps) => {
  return (
    <ActionCreatorProvider>
      <section
        className={`bg-background-main rounded-2xl w-[430px] border-[1px] border-bright-dark shadow-action-creator ${className}`}
      >
        <Header />
        <Content helpConfig={helpConfig} />
      </section>
    </ActionCreatorProvider>
  );
};

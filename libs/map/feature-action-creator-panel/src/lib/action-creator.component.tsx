import { ActionCreatorProvider } from './action-creator-panel.context';
import { Content } from './content/content.component';
import { Header } from './header/header.component';

type TActionCreatorPanelProps = {
  className?: string;
};

export const ActionCreator = ({ className = '' }: TActionCreatorPanelProps) => {
  return (
    <ActionCreatorProvider>
      <section
        className={`bg-background-main rounded-2xl w-[430px] border-[1px] border-bright-dark shadow-action-creator ${className}`}
      >
        <Header />
        <Content />
      </section>
    </ActionCreatorProvider>
  );
};

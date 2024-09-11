import { ActionCreatorProvider } from './action-creator-panel.context';
import { Content } from './content/content.component';
import { Footer } from './footer.component';
import { Header } from './header/header.component';

type TActionCreatorPanelProps = {
  className?: string;
};

export const ActionCreator = ({ className = '' }: TActionCreatorPanelProps) => {
  return (
    <ActionCreatorProvider>
      <section
        className={`bg-background-main rounded-2xl w-[420px] border-[1px] border-bright-dark shadow-action-creator ${className}`}
      >
        <Header />
        <Content />
        <Footer />
      </section>
    </ActionCreatorProvider>
  );
};

import { useFeatureFlag } from '@ukri/shared/utils/feature-flag';

import { ActionCreatorProvider } from './action-creator-panel.context';
import { Content } from './content/content.component';
import { Footer } from './footer.component';
import { Header } from './header/header.component';

type TActionCreatorPanelProps = {
  className?: string;
};

export const ActionCreator = ({ className = '' }: TActionCreatorPanelProps) => {
  const canUseActionCreator = useFeatureFlag('actionCreator');

  if (!canUseActionCreator) {
    return null;
  }

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

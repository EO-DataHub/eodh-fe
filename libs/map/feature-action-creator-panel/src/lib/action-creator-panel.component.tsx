import { ActionCreatorProvider } from './action-creator-panel.context';
import { Content } from './content/content.component';
import { Footer } from './footer.component';
import { Header } from './header/header.component';

export const ActionCreatorPanel = () => {
  return (
    <ActionCreatorProvider>
      <section className='absolute top-5 right-5 z-50 bg-background-main rounded-2xl w-[420px]'>
        <Header />
        <Content />
        <Footer />
      </section>
    </ActionCreatorProvider>
  );
};

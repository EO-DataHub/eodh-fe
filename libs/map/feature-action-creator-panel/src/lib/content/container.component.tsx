import { PropsWithChildren } from 'react';

import { UnactiveAcModeModal } from './modals/unactive-ac-mode-modal/unactive-ac-mode-modal.component';
import { UnloggedUserModal } from './modals/unlogged-user-modal/unlogged-user-modal.component';

export const Container = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export const Content = ({ children }: PropsWithChildren) => {
  return (
    <main className='bg-bright-main h-[450px] relative'>
      {children}
      <UnactiveAcModeModal />
      <UnloggedUserModal />
    </main>
  );
};

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className='p-4 flex justify-between gap-4 bg-background-main min-h-[65px] border-t-[1px] border-bright-dark rounded-b-2xl'>
      {children}
    </footer>
  );
};

import { PropsWithChildren, useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';

export const Footer = ({ children }: PropsWithChildren) => {
  const { collapsed } = useContext(ActionCreator);

  if (!collapsed) {
    return null;
  }

  return (
    <footer className='p-4 flex justify-between gap-4 bg-background-main min-h-[65px] border-t-[1px] border-bright-dark rounded-b-2xl'>
      {children}
    </footer>
  );
};

import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export const Content = ({ children }: PropsWithChildren) => {
  return <main className='bg-bright-main h-[450px] relative'>{children}</main>;
};

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <footer className='p-4 flex justify-between gap-4 bg-background-main min-h-[65px] border-t-[1px] border-bright-dark rounded-b-2xl'>
      {children}
    </footer>
  );
};

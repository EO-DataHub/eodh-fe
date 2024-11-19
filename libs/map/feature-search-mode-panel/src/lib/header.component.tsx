import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col border-bright-dark'>{children}</div>;
};

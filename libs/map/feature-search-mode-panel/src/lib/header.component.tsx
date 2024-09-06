import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  return <div className='flex border-bright-dark border-b-[1px] p-4'>{children}</div>;
};

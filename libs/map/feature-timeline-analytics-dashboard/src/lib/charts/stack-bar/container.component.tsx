import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return <div className='relative flex flex-row'>{children}</div>;
};

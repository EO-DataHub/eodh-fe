import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface IDrawButtonProps {
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const DrawButton = ({ selected, onClick, children }: PropsWithChildren<IDrawButtonProps>) => {
  const className = selected
    ? 'bg-primary text-primary-contrastText [&>svg]:fill-primary-contrastText'
    : 'hover:bg-primary hover:text-primary-contrastText [&>svg]:fill-text [&>svg]:hover:fill-primary-contrastText';

  return (
    <button className={clsx('p-4 cursor-pointer', className)} onClick={onClick}>
      {children}
    </button>
  );
};

import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface IDrawButtonProps {
  selected: boolean;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const DrawButton = ({ selected, disabled, onClick, children }: PropsWithChildren<IDrawButtonProps>) => {
  const baseClassName = !disabled ? 'hover:bg-primary-light hover:text-primary' : '';
  const className =
    selected && !disabled
      ? 'bg-primary text-primary-contrastText [&>svg]:fill-primary-contrastText'
      : '[&>svg]:fill-text [&>svg]:hover:fill-primary-contrastText';
  const disabledClassName = disabled
    ? 'bg-bright-light text-bright-mid hover:bg-bright-light hover:text-bright-mid cursor-not-allowed'
    : 'cursor-pointer';

  return (
    <button
      className={clsx('p-6.5', baseClassName, className, disabledClassName)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

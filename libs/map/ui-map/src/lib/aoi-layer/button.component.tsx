import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren } from 'react';

export const DrawButton = ({
  selected,
  onClick,
  children,
}: PropsWithChildren<{ selected: boolean; onClick: MouseEventHandler<HTMLDivElement> }>) => {
  const className = selected
    ? 'bg-primary text-primary-contrastText [&>svg]:fill-primary-contrastText'
    : 'hover:bg-primary hover:text-primary-contrastText [&>svg]:fill-text [&>svg]:hover:fill-primary-contrastText';

  return (
    <div className={clsx('p-4 cursor-pointer', className)} onClick={onClick}>
      {children}
    </div>
  );
};

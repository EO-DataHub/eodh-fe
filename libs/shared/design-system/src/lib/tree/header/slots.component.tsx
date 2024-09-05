import { Fragment, memo, ReactNode } from 'react';

import { TSlotPosition, TSlots } from '../tree.model';

type TSlotsProps = {
  slots: TSlots | undefined | null;
  position: TSlotPosition;
  className?: string;
  onClick?: () => void;
};

export const Slots = memo(({ slots, position, className, onClick }: TSlotsProps): ReactNode | ReactNode[] | null => {
  if (!slots) {
    return null;
  }

  const elements = slots.filter((i) => i.position === position);

  if (!elements.length) {
    return null;
  }

  if (onClick) {
    <button type='button' className={`flex flex-row items-center gap-x-2 ${className}`} onClick={onClick}>
      {elements.map((i) => (
        <Fragment key={i.key}>{i.element}</Fragment>
      ))}
    </button>;
  }

  return (
    <div className={`flex flex-row items-center gap-x-2 ${className}`}>
      {elements.map((i) => (
        <Fragment key={i.key}>{i.element}</Fragment>
      ))}
    </div>
  );
});

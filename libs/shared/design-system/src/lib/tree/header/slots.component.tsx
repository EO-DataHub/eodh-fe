import { Fragment, memo, ReactNode } from 'react';

import { TSlotPosition, TSlots } from '../tree.model';

type TSlotsProps = { slots: TSlots | undefined | null; position: TSlotPosition };

export const Slots = memo(({ slots, position }: TSlotsProps): ReactNode | ReactNode[] | null => {
  if (!slots) {
    return null;
  }

  const elements = slots.filter((i) => i.position === position);

  if (!elements.length) {
    return null;
  }

  return (
    <div className='flex flex-row items-center gap-x-2'>
      {elements.map((i) => (
        <Fragment key={i.key}>{i.element}</Fragment>
      ))}
    </div>
  );
});

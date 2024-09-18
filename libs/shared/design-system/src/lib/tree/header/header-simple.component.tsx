import { memo, PropsWithChildren, useContext } from 'react';

import { getSpacingClassName } from '../spacing.component';
import { TreeContext } from '../tree.component';
import { TSlots, TSpacing, TTree } from '../tree.model';
import { Slots } from './slots.component';
import { Title } from './title.component';

type THeaderSimpleProps = PropsWithChildren<{
  title: TTree['title'] | null;
  slots: TSlots | null | undefined;
}>;

const classNames = {
  container: (spacing: TSpacing) =>
    `ms-4 ps-3 before:start-[-4px] relative before:absolute before:top-0 before:w-[1px] before:-ms-px before:h-full before:bg-bright-dark ${getSpacingClassName(
      spacing
    )}`,
  wrapper: 'flex items-center gap-x-3',
};

export const HeaderSimple = memo(({ title, slots, children }: THeaderSimpleProps) => {
  const { spacing, expandable, disabled } = useContext(TreeContext);

  if (expandable && children) {
    return null;
  }

  return (
    <div className={classNames.container(spacing)}>
      <div className={classNames.wrapper}>
        <Slots slots={slots} position='title:before' disabled={disabled} />
        <Title title={title} fontWeight='regular' disabled={disabled} />
        <Slots slots={slots} position='title:after' disabled={disabled} />
      </div>
    </div>
  );
});

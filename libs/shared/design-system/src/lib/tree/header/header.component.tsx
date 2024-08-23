import { memo, useContext } from 'react';

import { TreeContext } from '../tree.component';
import { TTree } from '../tree.model';
import { Slots } from './slots.component';
import { Title } from './title.component';

type THeaderProps = Pick<TTree, 'title' | 'slots'>;

export const Header = memo(({ title, slots }: THeaderProps) => {
  const { expandable } = useContext(TreeContext);

  if (!expandable) {
    return null;
  }

  return (
    <div className='grow rounded-md w-full'>
      <div className='flex items-center gap-x-3'>
        <Slots slots={slots} position='title:before' />
        <Title
          title={title}
          fontWeight={expandable ? 'semibold' : 'regular'}
          className={`${expandable ? 'ml-3' : ''}`}
        />
        <Slots slots={slots} position='title:after' />
      </div>
    </div>
  );
});

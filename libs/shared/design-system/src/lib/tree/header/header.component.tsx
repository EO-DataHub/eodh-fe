import { memo } from 'react';

import { TTree } from '../tree.model';
import { Slots } from './slots.component';
import { Title } from './title.component';

type THeaderProps = Pick<TTree, 'title' | 'slots'>;

export const Header = memo(({ title, slots }: THeaderProps) => {
  return (
    <div className='grow rounded-md'>
      <div className='flex items-center gap-x-3'>
        <Slots slots={slots} position='title:before' />
        <Title title={title} fontWeight='semibold' className={`${!slots ? 'ml-3' : ''}`} />
        <Slots slots={slots} position='title:after' />
      </div>
    </div>
  );
});

import { memo, useContext } from 'react';

import { TreeContext } from '../tree.component';
import { TTree } from '../tree.model';
import { Slots } from './slots.component';
import { Title } from './title.component';

type THeaderProps = Pick<TTree, 'title' | 'slots'> & {
  className?: string;
  onClick?: () => void;
};

export const Header = memo(({ title, slots, className, onClick }: THeaderProps) => {
  const { expandable } = useContext(TreeContext);

  if (!expandable) {
    return null;
  }

  return (
    <div className={`flex grow rounded-md w-full ${className}`}>
      {onClick && (
        <button className='flex w-full items-center gap-x-3' onClick={onClick}>
          <Slots slots={slots} position='title:before' />
          <Title
            title={title}
            fontWeight={expandable ? 'semibold' : 'regular'}
            className={`${expandable ? 'ml-3' : ''}`}
          />
        </button>
      )}
      {!onClick && (
        <div className='flex w-full items-center gap-x-3'>
          <Slots slots={slots} position='title:before' />
          <Title
            title={title}
            fontWeight={expandable ? 'semibold' : 'regular'}
            className={`${expandable ? 'ml-3' : ''}`}
          />
        </div>
      )}
      <Slots slots={slots} position='title:after' className='ml-3' />
    </div>
  );
});

import { isValidElement, memo } from 'react';

import { Text } from '../../text/text';
import { TTree } from '../tree.model';

type TTileProps = Pick<TTree, 'className'> & {
  title: TTree['title'] | null;
  fontWeight: 'bold' | 'semibold' | 'regular';
};

export const Title = memo(({ title, className = '', fontWeight }: TTileProps) => {
  if (!title) {
    return null;
  }

  if (isValidElement(title)) {
    return <div className='grow'>{title}</div>;
  }

  return (
    <div className='grow'>
      <Text
        content={title}
        type='p'
        fontSize='medium'
        fontWeight={fontWeight}
        className={`text-neutral-dark text-left ${className}`}
      />
    </div>
  );
});

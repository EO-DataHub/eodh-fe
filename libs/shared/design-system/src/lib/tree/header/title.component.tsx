import { isValidElement, memo } from 'react';

import { Text } from '../../text/text';
import { TTree } from '../tree.model';

type TTileProps = Pick<TTree, 'className'> & {
  title: TTree['title'] | null;
  fontWeight: 'bold' | 'semibold' | 'regular';
  onClick?: () => void;
};

export const Title = memo(({ title, className = '', fontWeight, onClick }: TTileProps) => {
  if (!title) {
    return null;
  }

  if (isValidElement(title)) {
    if (onClick) {
      return (
        <button type='button' className='grow text-left'>
          {title}
        </button>
      );
    }

    return (
      <button type='button' className='grow text-left' onClick={onClick}>
        {title}
      </button>
    );
  }

  if (onClick) {
    return (
      <button type='button' className='grow' onClick={onClick}>
        <Text
          content={title}
          type='p'
          fontSize='medium'
          fontWeight={fontWeight}
          className={`text-neutral-dark text-left ${className}`}
        />
      </button>
    );
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

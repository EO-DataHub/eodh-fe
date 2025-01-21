import { Icon, Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { SquareButton } from '../../../components/square-button/square-button.component';

const badgeClassName = (selected: boolean) => {
  return `absolute top-[-12px] right-[-10px] block  w-4 h-4 rounded-lg ${
    selected ? 'bg-bright-main text-primary-main' : 'bg-primary-main text-bright-main'
  }`;
};

interface IComparisonToolButtonProps {
  onClick: () => void;
  selected: boolean;
  itemsCount?: number;
  disabled?: boolean;
}

export const ComparisonToolButton = ({ onClick, itemsCount, disabled, selected }: IComparisonToolButtonProps) => {
  const displayItemsCounter = useMemo(() => (itemsCount && itemsCount > 0 ? true : false), [itemsCount]);

  return (
    <SquareButton selected={selected} disabled={disabled} onClick={onClick}>
      <div className='relative'>
        {displayItemsCounter && (
          <span className={badgeClassName(selected)}>
            <Text
              type='span'
              fontSize='small'
              fontWeight='regular'
              content={itemsCount}
              className='absolute top-[2px] left-[6px]'
            />
          </span>
        )}
        <Icon name='CompareArrows' width={24} height={24} />
      </div>
    </SquareButton>
  );
};

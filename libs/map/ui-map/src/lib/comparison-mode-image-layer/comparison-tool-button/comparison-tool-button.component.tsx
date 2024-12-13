import { Icon, Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { NavigationButton } from '../../navigation-button/navigation-button.component';

interface IComparisonToolButtonProps {
  onClick: () => void;
  selected: boolean;
  itemsAdded?: number;
  disabled?: boolean;
}

export const ComparisonToolButton = ({ onClick, itemsAdded, disabled, selected }: IComparisonToolButtonProps) => {
  const displayItemsCounter = useMemo(() => (itemsAdded && itemsAdded > 0 ? true : false), [itemsAdded]);

  return (
    <NavigationButton selected={selected} disabled={disabled} onClick={onClick}>
      <div className='relative'>
        {displayItemsCounter && (
          <span
            className={`absolute top-[-12px] right-[-10px] block  w-4 h-4 rounded-lg ${
              selected ? 'bg-bright-main text-primary-main' : 'bg-primary-main text-bright-main'
            }`}
          >
            <Text
              type='span'
              fontSize='small'
              fontWeight='regular'
              content={`${itemsAdded}`}
              className='absolute top-[2px] left-[6px]'
            />
          </span>
        )}
        <Icon name='CompareArrows' width={24} height={24} />
      </div>
    </NavigationButton>
  );
};

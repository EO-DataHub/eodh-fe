import { TIterableTreeCategoryValues } from '@ukri/map/data-access-map';
import { TreeItem as UiTreeItem } from '@ukri/shared/design-system';
import { ReactNode } from 'react';
import { useWatch } from 'react-hook-form';

import { useControl } from './use-control.hook';
import { useSlots } from './use-slots.hook';

type TTreeCategoryProps = {
  item: TIterableTreeCategoryValues;
  disabled?: boolean;
  children: (disabled?: boolean) => ReactNode;
};

export const TreeCategory = ({ item, children, disabled: forceDisabled = false }: TTreeCategoryProps) => {
  const { expandedControlName, disabled } = useControl(item, forceDisabled);
  const expanded = useWatch({ name: expandedControlName });
  const slots = useSlots(item, forceDisabled);

  return (
    <UiTreeItem
      className='text-text-primary'
      slots={slots}
      title={item.model.translationKey}
      expanded={expanded || false}
      disabled={disabled}
      expandable={item.model.options?.expendable}
    >
      {children(disabled)}
    </UiTreeItem>
  );
};

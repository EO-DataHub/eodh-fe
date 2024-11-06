import { TreeItem as UiTreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';
import { useWatch } from 'react-hook-form';

import { ITreeCategory } from '../../tree-builder/tree-builder.model';
import { useControl } from './use-control.hook';
import { useSlots } from './use-slots.hook';

type TTreeCategoryProps = {
  item: ITreeCategory;
};

export const TreeCategory = ({ item, children }: PropsWithChildren<TTreeCategoryProps>) => {
  const { expandedControlName, disabled } = useControl(item);
  const expanded = useWatch({ name: expandedControlName });
  const slots = useSlots(item);

  return (
    <UiTreeItem
      className='text-text-primary'
      slots={slots}
      title={item.model.translationKey}
      expanded={expanded || false}
      disabled={disabled}
      expandable={item.model.options?.expendable}
    >
      {children}
    </UiTreeItem>
  );
};

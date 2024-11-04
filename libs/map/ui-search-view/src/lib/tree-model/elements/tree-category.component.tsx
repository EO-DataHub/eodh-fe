import { PropsWithChildren, useCallback, useMemo } from 'react';
import { ITreeCategory } from '../tree.model';
import { ControlledCheckbox, TreeItem as UiTreeItem, TSlots } from '@ukri/shared/design-system';
import { useTreeContext } from '../tree.context';

type TTreeCategoryProps = {
  item: ITreeCategory;
}

export const TreeCategory = ({ item, children }: PropsWithChildren<TTreeCategoryProps>) => {
  const { update } = useTreeContext();
  const selectedIcon = useMemo(() => (item.control.value ? 'Check' : 'Remove'), [item.control.value]);

  console.log('selectedIcon', selectedIcon, item.control.value, item.control.type);

  const updateValue = useCallback(() => {
    update(item.id, 'value')
  }, [item.id, update]);

  const slots = useMemo(
    (): TSlots | undefined => {
      if (!item.control.type) {
        return;
      }

      console.log('slots', item.control, selectedIcon, item.name)

      return [
        {
          position: 'title:after',
          element: (
            <ControlledCheckbox name={item.name} value={item.control.value} icon={selectedIcon} disabled={item.control.disabled} onChange={updateValue} />
          ),
          key: 'checkbox',
        },
      ]
    },
    [item.name, item.control.value, item.control.disabled, item.control.type, selectedIcon, updateValue]
  );

  return (
    <UiTreeItem
      className='text-text-primary'
      slots={slots}
      title={item.translationKey}
      expanded={item.control.expanded}
      disabled={item.control.disabled}
      expandable={item.control.expendable}
    >
      {children}
    </UiTreeItem>
  )
}

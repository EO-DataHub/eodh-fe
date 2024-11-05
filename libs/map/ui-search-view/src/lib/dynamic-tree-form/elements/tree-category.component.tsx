import { Checkbox, TreeItem as UiTreeItem, TSlots } from '@ukri/shared/design-system';
import isArray from 'lodash/isArray';
import { ChangeEvent, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { IDynamicTreeCategory } from '../tree-dynamic.model';

type TTreeCategoryProps = {
  item: IDynamicTreeCategory;
};

export const TreeCategory = ({ item, children }: PropsWithChildren<TTreeCategoryProps>) => {
  const { register, setValue } = useFormContext();
  const expandedControlName = useMemo(
    () => item.controls?.find((control) => control.type === 'expand')?.name || '',
    [item.controls]
  );
  const valueControlName = useMemo(
    () => item.controls?.find((control) => control.type === 'checkbox' || control.type === 'radio')?.name || '',
    [item.controls]
  );
  const expanded = useWatch({ name: expandedControlName });
  const { field } = useController({ name: valueControlName });
  const childControlNames = useMemo(
    () =>
      (item.children || [])
        ?.map((item) => item.controls)
        .flat()
        .filter((control) => control?.type === 'checkbox' || control?.type === 'radio')
        .map((control) => control?.name)
        .filter((item): item is string => !!item),
    [item.children]
  );
  const childrenSelected: boolean[] = useWatch({ name: childControlNames });
  const selectedIcon = useMemo(() => {
    if (isArray(childrenSelected)) {
      return childrenSelected.every((item) => !!item) ? 'Check' : 'Remove';
    }

    return childrenSelected ? 'Check' : 'Remove';
  }, [childrenSelected]);

  const toggle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const options = { shouldValidate: true, shouldDirty: true, shouldTouch: true };
      let value = event.target.checked;

      if (!value && childrenSelected.every((item) => !!item)) {
        value = false;
      } else if (field.value && childrenSelected.some((item) => !!item)) {
        value = true;
      }

      childControlNames.forEach((controlName) => {
        setValue(controlName, value, options);
      });

      field.onChange({ ...event, target: { ...event.target, checked: value } });
    },
    [childControlNames, childrenSelected, field, setValue]
  );

  const slots = useMemo((): TSlots | undefined => {
    if (!item.controls?.length) {
      return;
    }

    return item.controls
      .filter((control) => control.type === 'checkbox' || control.type === 'radio')
      .map((control) => ({
        position: 'title:after',
        element: (
          <Checkbox
            {...register(control.name)}
            icon={selectedIcon}
            onChange={toggle}
            disabled={item.options?.disabled}
          />
        ),
        key: 'checkbox',
      }));
  }, [item.controls, item.options?.disabled, register, selectedIcon, toggle]);

  useEffect(() => {
    if (!isArray(childrenSelected) || childrenSelected.length <= 0 || !valueControlName) {
      return;
    }

    if (childrenSelected.some((item) => !!item)) {
      if (!field.value) {
        setValue(valueControlName, true);
      }
    } else if (childrenSelected.every((item) => !item)) {
      if (field.value) {
        setValue(valueControlName, false);
      }
    }
  }, [childrenSelected, field.value, setValue, valueControlName]);

  return (
    <UiTreeItem
      className='text-text-primary'
      slots={slots}
      title={item.translationKey}
      expanded={expanded || false}
      disabled={item.options?.disabled}
      expandable={item.options?.expendable}
    >
      {children}
    </UiTreeItem>
  );
};

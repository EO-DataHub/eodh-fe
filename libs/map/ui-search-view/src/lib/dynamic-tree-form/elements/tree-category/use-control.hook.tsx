import {
  TIterableTreeCategoryValues,
  TTreeCategoryValues,
  TTreeItemValues,
  TTreeSettingsItemValues,
} from '@ukri/map/data-access-map';
import isArray from 'lodash/isArray';
import { useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { getControlName } from '../utils';

const useChildControlNames = (item: TIterableTreeCategoryValues): string[] => {
  return useMemo(() => {
    return (item.model.children || [])
      .filter(
        (item): item is TTreeCategoryValues['model'] | TTreeItemValues['model'] | TTreeSettingsItemValues['model'] =>
          item.type === 'category' || item.type === 'item' || item.type === 'settingItem'
      )
      .filter((item) => !item.options?.disabled)
      .map((item) => item.controls?.value)
      .flat()
      .map((control) => getControlName(control?.name))
      .filter((item) => item.length);
  }, [item.model.children]);
};

export const useControl = (item: TIterableTreeCategoryValues, forceDisabled: boolean) => {
  const { setValue } = useFormContext();
  const disabled = useMemo(
    () => item.model.options?.disabled || forceDisabled,
    [item.model.options?.disabled, forceDisabled]
  );
  const expandedControlName = useMemo(
    () => getControlName(item.model.controls.expand.name),
    [item.model.controls.expand.name]
  );
  const valueControlName = useMemo(
    () => getControlName(item.model.controls.value?.name),
    [item.model.controls.value?.name]
  );
  const childControlNames = useChildControlNames(item);
  const { field } = useController({ name: valueControlName });
  const childrenSelected: boolean[] = useWatch({ name: childControlNames });

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

  return useMemo(
    () => ({
      expandedControlName,
      valueControlName,
      childControlNames,
      disabled,
    }),
    [expandedControlName, valueControlName, childControlNames, disabled]
  );
};

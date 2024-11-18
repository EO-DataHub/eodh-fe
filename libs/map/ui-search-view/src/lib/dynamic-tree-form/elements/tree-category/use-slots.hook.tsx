import { TIterableTreeCategoryValues } from '@ukri/map/data-access-map';
import { TSlots } from '@ukri/shared/design-system';
import isArray from 'lodash/isArray';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '../checkbox.component';
import { useControl } from './use-control.hook';

export const useSlots = (item: TIterableTreeCategoryValues, forceDisabled: boolean): TSlots | undefined => {
  const { register, setValue, trigger } = useFormContext();
  const { childControlNames, valueControlName, disabled } = useControl(item, forceDisabled);
  const { field } = useController({ name: valueControlName });
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
      trigger();
    },
    [childControlNames, childrenSelected, field, setValue, trigger]
  );

  return useMemo((): TSlots | undefined => {
    if (!valueControlName) {
      return;
    }

    return [
      {
        position: 'title:after',
        element: <Checkbox name={valueControlName} icon={selectedIcon} onChange={toggle} disabled={disabled} />,
        key: 'checkbox',
      },
    ];
  }, [valueControlName, disabled, register, selectedIcon, toggle]);
};

import { Checkbox, TSlots } from '@ukri/shared/design-system';
import isArray from 'lodash/isArray';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { ITreeCategory } from '../../tree-builder/tree-builder.model';
import { useControl } from './use-control.hook';

export const useSlots = (item: ITreeCategory): TSlots | undefined => {
  const { register, setValue } = useFormContext();
  const { childControlNames, valueControlName, disabled } = useControl(item);
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
    },
    [childControlNames, childrenSelected, field, setValue]
  );

  return useMemo((): TSlots | undefined => {
    if (!valueControlName) {
      return;
    }

    return [
      {
        position: 'title:after',
        element: <Checkbox {...register(valueControlName)} icon={selectedIcon} onChange={toggle} disabled={disabled} />,
        key: 'checkbox',
      },
    ];
  }, [valueControlName, disabled, register, selectedIcon, toggle]);
};

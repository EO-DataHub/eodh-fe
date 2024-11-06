import isArray from 'lodash/isArray';
import { useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { ITreeCategory } from '../../tree-builder/tree-builder.model';

const useChildControlNames = (item: ITreeCategory) => {
  return useMemo(() => {
    return (item.model.children || [])
      .filter((item) => !item.options?.disabled)
      .map((item) => item.controls.value)
      .flat()
      .map((control) => control?.name)
      .filter((item): item is string => !!item);
  }, [item.model.children]);
};

export const useControl = (item: ITreeCategory) => {
  const { setValue } = useFormContext();
  const disabled = useMemo(() => item.model.options?.disabled, [item.model.options?.disabled]);
  const expandedControlName = useMemo(() => item.model.controls.expand.name, [item.model.controls.expand.name]);
  const valueControlName = useMemo(() => item.model.controls.value?.name || '', [item.model.controls.value?.name]);
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

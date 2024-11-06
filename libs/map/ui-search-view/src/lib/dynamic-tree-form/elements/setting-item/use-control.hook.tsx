import { useMemo } from 'react';
import { get, useFormContext } from 'react-hook-form';

import { TreeSettingsItem } from '../../tree-builder/tree.settings-item';

export const useControl = (item: TreeSettingsItem) => {
  const {
    formState: { errors },
  } = useFormContext();
  const valueControlName = useMemo(() => item.model.controls.value.name, [item.model.controls.value.name]);
  const disabled = useMemo(() => item.model.options?.disabled, [item.model.options?.disabled]);
  const state = useMemo(() => (get(errors, valueControlName) ? 'error' : undefined), [errors, valueControlName]);

  return useMemo(
    () =>
      ({
        valueControlName,
        disabled,
        state,
      } as const),
    [valueControlName, disabled, state]
  );
};

import { TIterableTreeSettingsItemValues } from '@ukri/map/data-access-map';
import { useMemo } from 'react';
import { get, useFormContext } from 'react-hook-form';

export const useControl = (item: TIterableTreeSettingsItemValues) => {
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

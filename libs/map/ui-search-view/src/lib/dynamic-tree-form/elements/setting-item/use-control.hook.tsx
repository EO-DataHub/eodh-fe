import { TIterableTreeSettingsItemValues } from '@ukri/map/data-access-map';
import { useMemo } from 'react';

import { getControlName } from '../utils';

export const useControl = (item: TIterableTreeSettingsItemValues, forceDisabled: boolean) => {
  const valueControlName = useMemo(
    () => getControlName(item.model.controls.value.name),
    [item.model.controls.value.name]
  );
  const disabled = useMemo(
    () => item.model.options?.disabled || forceDisabled,
    [item.model.options?.disabled, forceDisabled]
  );

  return useMemo(
    () =>
      ({
        valueControlName,
        disabled,
      } as const),
    [valueControlName, disabled]
  );
};

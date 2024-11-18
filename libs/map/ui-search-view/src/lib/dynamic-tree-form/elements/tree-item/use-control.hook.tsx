import { TIterableTreeItemValues } from '@ukri/map/data-access-map';
import { useMemo } from 'react';

import { getControlName } from '../utils';

export const useControl = (item: TIterableTreeItemValues, forceDisabled: boolean) => {
  const settingControlName = useMemo(
    () => getControlName(item.model.controls.settings?.name),
    [item.model.controls.settings?.name]
  );
  const showSettingsControlName = useMemo(
    () => getControlName(item.model.controls.settings?.name),
    [item.model.controls.settings?.name]
  );
  const valueControlName = useMemo(
    () => getControlName(item.model.controls.value.name),
    [item.model.controls.value.name]
  );
  const disabled = useMemo(
    () => item.model.options?.disabled || forceDisabled,
    [item.model.options?.disabled, forceDisabled]
  );

  return useMemo(
    () => ({
      settingControlName,
      showSettingsControlName,
      valueControlName,
      disabled,
    }),
    [settingControlName, showSettingsControlName, valueControlName, disabled]
  );
};

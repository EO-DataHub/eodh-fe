import { TIterableTreeItemValues } from '@ukri/map/data-access-map';
import { useMemo } from 'react';

export const useControl = (item: TIterableTreeItemValues) => {
  const settingControlName = useMemo(
    () => item.model.controls.settings?.name || '',
    [item.model.controls.settings?.name]
  );
  const showSettingsControlName = useMemo(
    () => item.model.controls.settings?.name || '',
    [item.model.controls.settings?.name]
  );
  const valueControlName = useMemo(() => item.model.controls.value.name, [item.model.controls.value.name]);
  const disabled = useMemo(() => item.model.options?.disabled, [item.model.options?.disabled]);

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

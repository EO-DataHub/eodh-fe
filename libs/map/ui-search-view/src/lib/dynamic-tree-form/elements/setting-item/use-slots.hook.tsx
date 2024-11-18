import { TIterableTreeSettingsItemValues } from '@ukri/map/data-access-map';
import { TSlots } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { Checkbox } from '../checkbox.component';
import { useControl } from './use-control.hook';

export const useSlots = (item: TIterableTreeSettingsItemValues, forceDisabled: boolean) => {
  const { valueControlName, disabled } = useControl(item, forceDisabled);

  return useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: <Checkbox name={valueControlName} disabled={disabled} />,
        key: 'checkbox',
      },
    ],
    [valueControlName, disabled]
  );
};

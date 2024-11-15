import { TIterableTreeSettingsItemValues } from '@ukri/map/data-access-map';
import { Checkbox, TSlots } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useControl } from './use-control.hook';

export const useSlots = (item: TIterableTreeSettingsItemValues, forceDisabled?: boolean) => {
  const { register, trigger } = useFormContext();
  const { valueControlName, state, disabled } = useControl(item);

  const validateFields = useCallback(() => {
    trigger();
  }, [trigger]);

  return useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: (
          <Checkbox
            {...register(valueControlName, { onChange: validateFields })}
            state={state}
            disabled={disabled || forceDisabled}
          />
        ),
        key: 'checkbox',
      },
    ],
    [valueControlName, disabled, forceDisabled, state, register, validateFields]
  );
};

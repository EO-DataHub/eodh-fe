import { Checkbox, TSlots } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { TreeSettingsItem } from '../../tree-builder/tree.settings-item';
import { useControl } from './use-control.hook';

export const useSlots = (item: TreeSettingsItem, forceDisabled?: boolean) => {
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

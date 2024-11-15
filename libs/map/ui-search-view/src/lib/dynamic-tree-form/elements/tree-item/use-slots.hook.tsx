import { TIterableTreeItemValues } from '@ukri/map/data-access-map';
import { Checkbox as BaseCheckbox, Icon, TSlots } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { get, useFormContext, useWatch } from 'react-hook-form';

import { useControl } from './use-control.hook';

type TSettingsIconProps = { value: boolean; disabled: boolean };

const SettingsIcon = ({ value, disabled }: TSettingsIconProps) => {
  if (value && !disabled) {
    return <Icon name='Settings' className='text-primary' />;
  }

  if (disabled) {
    return <Icon name='Settings' className='text-bright-mid' />;
  }

  return <Icon name='Settings' className='text-neutral-light hover:text-primary' />;
};

type TCheckboxProps = { name: string; disabled?: boolean };

const Checkbox = ({ name, disabled }: TCheckboxProps) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const state = get(errors, name) ? 'error' : undefined;

  const triggerValidation = useCallback(() => {
    trigger();
  }, [trigger]);

  return <BaseCheckbox {...register(name, { onChange: triggerValidation })} state={state} disabled={disabled} />;
};

type TSettingsButtonProps = { value: boolean; disabled?: boolean; onClick: () => void };

const SettingsButton = ({ value, disabled, onClick }: TSettingsButtonProps) => {
  return (
    <button type='button' onClick={onClick} disabled={disabled}>
      <SettingsIcon value={value} disabled={!!disabled} />
    </button>
  );
};

export const useSlots = (item: TIterableTreeItemValues, renderSettingsButton: boolean): TSlots => {
  const { setValue } = useFormContext();
  const { settingControlName, showSettingsControlName, valueControlName, disabled } = useControl(item);
  const showSettings = useWatch({ name: showSettingsControlName });
  const enabled = useWatch({ name: valueControlName });

  const toggleSettings = useCallback(
    (name: string) => {
      const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
      setValue(name, !showSettings, options);
    },
    [showSettings, setValue]
  );

  return useMemo(() => {
    if (!settingControlName || !renderSettingsButton) {
      return [
        {
          position: 'title:before',
          element: <Icon name='Satellite' className={disabled ? 'text-bright-mid' : 'text-neutral-light'} />,
          key: 'Satellite',
        },
        {
          position: 'title:after',
          element: <Checkbox name={item.model.controls.value.name} disabled={disabled} />,
          key: 'checkbox',
        },
      ];
    }

    return [
      {
        position: 'title:before',
        element: <Icon name='Satellite' className={disabled ? 'text-bright-mid' : 'text-neutral-light'} />,
        key: 'Satellite',
      },
      {
        position: 'title:after',
        element: (
          <SettingsButton
            value={!!enabled}
            onClick={() => toggleSettings(settingControlName)}
            disabled={!enabled || disabled}
          />
        ),
        key: 'button',
      },
      {
        position: 'title:after',
        element: <Checkbox name={item.model.controls.value.name} disabled={disabled} />,
        key: 'checkbox',
      },
    ];
  }, [disabled, enabled, item.model.controls.value.name, renderSettingsButton, settingControlName, toggleSettings]);
};

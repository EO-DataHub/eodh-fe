import { TIterableTreeItemValues } from '@ukri/map/data-access-map';
import { Icon, TSlots } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Checkbox } from '../checkbox.component';
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

type TSettingsButtonProps = { value: boolean; disabled?: boolean; onClick: () => void };

const SettingsButton = ({ value, disabled, onClick }: TSettingsButtonProps) => {
  return (
    <button type='button' onClick={onClick} disabled={disabled}>
      <SettingsIcon value={value} disabled={!!disabled} />
    </button>
  );
};

export const useSlots = (
  item: TIterableTreeItemValues,
  renderSettingsButton: boolean,
  forceDisabled: boolean
): TSlots => {
  const { setValue, trigger } = useFormContext();
  const { settingControlName, showSettingsControlName, valueControlName, disabled } = useControl(item, forceDisabled);
  const showSettings = useWatch({ name: showSettingsControlName });
  const enabled = useWatch({ name: valueControlName });

  const toggleSettings = useCallback(
    (name: string) => {
      const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
      setValue(name, !showSettings, options);
      trigger();
    },
    [showSettings, setValue, trigger]
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
          element: <Checkbox name={valueControlName} disabled={disabled} />,
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
        element: <Checkbox name={valueControlName} disabled={disabled} />,
        key: 'checkbox',
      },
    ];
  }, [disabled, enabled, valueControlName, renderSettingsButton, settingControlName, toggleSettings]);
};

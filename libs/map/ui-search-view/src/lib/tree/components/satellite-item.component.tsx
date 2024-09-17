import { Checkbox as BaseCheckbox, Icon, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import get from 'lodash/get';
import { PropsWithChildren, useCallback, useContext, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { TreeSettings, TTreeSettings } from '../tree.context';
import { Error } from './error.component';
import { SettingsTree } from './settings-tree.component';
import { Title } from './title.component';

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

type TSettingsButtonProps = PropsWithChildren<{ value: boolean; disabled: boolean; onClick: () => void }>;

const SettingsButton = ({ value, disabled, onClick, children }: TSettingsButtonProps) => {
  if (!children) {
    return null;
  }

  return (
    <button type='button' onClick={onClick} disabled={disabled}>
      <SettingsIcon value={value} disabled={disabled} />
    </button>
  );
};

type TCheckboxProps = { name: keyof TTreeSettings; disabled?: boolean };

const Checkbox = ({ name, disabled }: TCheckboxProps) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<TFormDefaultValues>();
  const state = get(errors, name) ? 'error' : undefined;

  const triggerValidation = useCallback(() => {
    trigger();
  }, [trigger]);

  return <BaseCheckbox {...register(name, { onChange: triggerValidation })} state={state} disabled={disabled} />;
};

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name: keyof TTreeSettings; disabled?: boolean }>;

export const SatelliteItem = ({ title, name, disabled, children }: TSatelliteItemProps) => {
  const { settings, changeSettings } = useContext(TreeSettings);
  const enabled = useWatch<TFormDefaultValues>({ name });
  const currentSettings = useMemo(() => settings[name], [settings, name]);

  const toggleSettings = useCallback(() => {
    changeSettings((currentSettings) => ({ ...currentSettings, [name]: !currentSettings[name] }));
  }, [changeSettings, name]);

  useEffect(() => {
    if (!enabled) {
      changeSettings((currentSettings) => ({ ...currentSettings, [name]: false }));
    }
  }, [changeSettings, enabled, name]);

  const slots = useMemo((): TSlots => {
    return [
      {
        position: 'title:before',
        element: <Icon name='Satellite' className={disabled ? 'text-bright-mid' : 'text-neutral-light'} />,
        key: 'Satellite',
      },
      {
        position: 'title:after',
        element: (
          <SettingsButton value={currentSettings} onClick={toggleSettings} disabled={!enabled}>
            {children}
          </SettingsButton>
        ),
        key: 'button',
      },
      {
        position: 'title:after',
        element: <Checkbox name={name} disabled={disabled} />,
        key: 'checkbox',
      },
    ];
  }, [name, currentSettings, toggleSettings, enabled, disabled, children]);

  return (
    <>
      <Error name={name} />
      <TreeItem
        title={<Title title={title} fontWeight='regular' disabled={disabled} />}
        slots={slots}
        expandable={false}
      >
        {currentSettings && <SettingsTree>{children}</SettingsTree>}
      </TreeItem>
    </>
  );
};

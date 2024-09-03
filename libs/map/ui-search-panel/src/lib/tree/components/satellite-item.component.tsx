import { Checkbox, Icon, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useCallback, useContext, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TForm } from '../form.model';
import { TreeSettings, TTreeSettings } from '../tree.context';
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
    <button onClick={onClick} disabled={disabled}>
      <SettingsIcon value={value} disabled={disabled} />
    </button>
  );
};

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name: keyof TTreeSettings }>;

export const SatelliteItem = ({ title, name, children }: TSatelliteItemProps) => {
  const { settings, changeSettings } = useContext(TreeSettings);
  const { register } = useFormContext<TForm>();
  const enabled = useWatch<TForm>({ name });
  const currentSettings = useMemo(() => settings[name], [settings, name]);

  const toggleSettings = useCallback(() => {
    changeSettings((currentSettings) => ({ ...currentSettings, [name]: !currentSettings[name] }));
  }, [changeSettings, name]);

  useEffect(() => {
    if (!enabled) {
      changeSettings((currentSettings) => ({ ...currentSettings, [name]: false }));
    }
  }, [changeSettings, enabled, name]);

  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:before',
        element: <Icon name='Satellite' className='text-neutral-light' />,
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
      { position: 'title:after', element: <Checkbox {...register(name)} />, key: 'checkbox' },
    ],
    [currentSettings, toggleSettings, enabled, children, register, name]
  );

  return (
    <TreeItem title={<Title title={title} fontWeight='regular' />} slots={slots} expandable={false}>
      {currentSettings && <SettingsTree>{children}</SettingsTree>}
    </TreeItem>
  );
};

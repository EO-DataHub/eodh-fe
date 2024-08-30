import { Checkbox, Icon, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { FieldPath, useFormContext, useWatch } from 'react-hook-form';

import { TForm } from '../form.model';
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

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name: FieldPath<TForm> }>;

export const SatelliteItem = ({ title, name, children }: TSatelliteItemProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const { register } = useFormContext<TForm>();
  const enabled = useWatch<TForm>({ name });

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setShowSettings(false);
    }
  }, [enabled]);

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
          <SettingsButton value={showSettings} onClick={toggleSettings} disabled={!enabled}>
            {children}
          </SettingsButton>
        ),
        key: 'button',
      },
      { position: 'title:after', element: <Checkbox {...register(name)} />, key: 'checkbox' },
    ],
    [enabled, children, name, register, showSettings, toggleSettings]
  );

  return (
    <TreeItem title={<Title title={title} fontWeight='regular' />} slots={slots} expandable={false}>
      {showSettings && <SettingsTree>{children}</SettingsTree>}
    </TreeItem>
  );
};

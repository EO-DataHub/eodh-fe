import { Checkbox, Icon, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { SettingsTree } from './settings-tree.component';
import { Title } from './title.component';

type TSettingsIconProps = { value: boolean };

const SettingsIcon = ({ value }: TSettingsIconProps) => {
  if (value) {
    return <Icon name='Settings' className='text-primary' />;
  }

  return <Icon name='Settings' className='text-neutral-light hover:text-primary' />;
};

type TSettingsButtonProps = PropsWithChildren<{ value: boolean; onClick: () => void }>;

const SettingsButton = ({ value, onClick, children }: TSettingsButtonProps) => {
  if (!children) {
    return null;
  }

  return (
    <button onClick={onClick}>
      <SettingsIcon value={value} />
    </button>
  );
};

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name?: string }>;

export const SatelliteItem = ({ title, name, children }: TSatelliteItemProps) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

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
          <SettingsButton value={showSettings} onClick={toggleSettings}>
            {children}
          </SettingsButton>
        ),
        key: 'button',
      },
      { position: 'title:after', element: <Checkbox name={name ? name : title} />, key: 'checkbox' },
    ],
    [children, name, showSettings, title, toggleSettings]
  );

  return (
    <TreeItem title={<Title title={title} fontWeight='regular' />} slots={slots} expandable={false}>
      {showSettings && <SettingsTree>{children}</SettingsTree>}
    </TreeItem>
  );
};

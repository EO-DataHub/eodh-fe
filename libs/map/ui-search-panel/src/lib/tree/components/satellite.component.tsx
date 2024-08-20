import { Checkbox, Icon } from '@ukri/shared/design-system';
import { TreeItem } from '@ukri/shared/design-system';
import { TTranslation } from '@ukri/shared/utils/translate';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';

import { SettingsTree } from './settings.component';
import { Title } from './title.component';

const SettingsButton = ({ value, onClick }: { value: boolean; onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      {!value && <Icon name='Settings' className='text-bright-dark' />}
      {value && <Icon name='Settings' className='text-primary' />}
    </button>
  );
};

export const SatelliteItem = ({ title, name, children }: PropsWithChildren<{ title: TTranslation; name?: string }>) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = useCallback(() => {
    setShowSettings((value) => !value);
  }, []);

  const renderChildren = useMemo(() => {
    if (!showSettings) {
      return null;
    }

    return <SettingsTree>{children}</SettingsTree>;
  }, [children, showSettings]);

  const renderButton = useMemo(() => {
    if (!children) {
      return null;
    }

    return <SettingsButton value={showSettings} onClick={toggleSettings} />;
  }, [children, showSettings, toggleSettings]);

  return (
    <TreeItem
      title={<Title title={title} fontWeight='regular' />}
      icon={[
        { position: 'before', icon: <Icon name='Satellite' className='text-bright-dark' />, key: 'Satellite' },
        { position: 'after', icon: renderButton, key: 'button' },
        { position: 'after', icon: <Checkbox name={name ? name : title} />, key: 'checkbox' },
      ]}
      collapsable={false}
    >
      {renderChildren}
    </TreeItem>
  );
};

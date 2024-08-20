import { Checkbox, Spacing, TreeItem } from '@ukri/shared/design-system';
import { Tree } from '@ukri/shared/design-system';
import { TTranslation } from '@ukri/shared/utils/translate';
import { PropsWithChildren } from 'react';

import { Title } from './title.component';

export const SettingsTree = ({ children }: PropsWithChildren) => {
  return (
    <Tree spacing='1'>
      <Spacing spacing='0.5' />
      {children}
      <Spacing spacing='0.5' />
    </Tree>
  );
};

export const SettingsSection = ({ title, children }: PropsWithChildren<{ title: TTranslation }>) => {
  return (
    <>
      <TreeItem title={<Title title={title} />} />
      {children}
    </>
  );
};

export const SettingsItem = ({ title, name }: { title: TTranslation; name?: string }) => {
  return (
    <TreeItem
      title={title}
      icon={[{ position: 'after', icon: <Checkbox name={name ? name : title} />, key: 'checkbox' }]}
    />
  );
};

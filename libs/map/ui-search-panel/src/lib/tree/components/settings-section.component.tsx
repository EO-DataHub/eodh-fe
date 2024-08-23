import { TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

import { Title } from './title.component';

type TSettingsSection = PropsWithChildren<{ title: ParseKeys }>;

export const SettingsSection = ({ title, children }: TSettingsSection) => {
  return (
    <>
      <TreeItem title={<Title title={title} />} />
      {children}
    </>
  );
};

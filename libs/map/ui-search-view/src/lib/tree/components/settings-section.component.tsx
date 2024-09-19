import { TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

import { getIntend, TIndent } from './indent.utils';
import { Title } from './title.component';

type TSettingsSection = PropsWithChildren<{ title: ParseKeys; indent?: TIndent; disabled?: boolean }>;

export const SettingsSection = ({ title, indent, disabled, children }: TSettingsSection) => {
  return (
    <>
      <TreeItem title={<Title title={title} disabled={disabled} />} indent={getIntend(indent)} disabled={disabled} />
      {children}
    </>
  );
};

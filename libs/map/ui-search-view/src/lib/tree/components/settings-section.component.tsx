import { TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren } from 'react';

import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsSection = PropsWithChildren<{ title: ParseKeys; indent?: TIndent; disabled?: boolean }>;

export const SettingsSection = ({ title, indent: currentIndent, disabled, children }: TSettingsSection) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);

  return (
    <>
      <TreeItem
        title={<Title title={title} disabled={disabled} />}
        indent={getTreeIndent(indent)}
        disabled={disabled}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};

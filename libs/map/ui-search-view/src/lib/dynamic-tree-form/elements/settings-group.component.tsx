import { TreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

import { IDynamicTreeSettingGroup } from '../tree-dynamic.model';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsSection = PropsWithChildren<{ item: IDynamicTreeSettingGroup; indent?: TIndent; disabled?: boolean }>;

export const SettingsGroup = ({ item, indent: currentIndent, children }: TSettingsSection) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);

  return (
    <>
      <TreeItem
        title={<Title title={item.translationKey} disabled={item.options?.disabled} />}
        indent={getTreeIndent(indent)}
        disabled={item.options?.disabled}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};

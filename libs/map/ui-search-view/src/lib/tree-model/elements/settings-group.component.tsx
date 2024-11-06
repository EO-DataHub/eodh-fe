import { TreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

import { ITreeSettingGroup } from '../tree.model';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsSection = PropsWithChildren<{ item: ITreeSettingGroup; indent?: TIndent; disabled?: boolean }>;

export const SettingsGroup = ({ item, indent: currentIndent, children }: TSettingsSection) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);

  return (
    <>
      <TreeItem
        title={<Title title={item.translationKey} disabled={item.control.disabled} />}
        indent={getTreeIndent(indent)}
        disabled={item.control.disabled}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};

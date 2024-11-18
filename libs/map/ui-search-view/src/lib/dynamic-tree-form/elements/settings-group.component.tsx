import { TIterableTreeSettingsGroupValues } from '@ukri/map/data-access-map';
import { TreeItem } from '@ukri/shared/design-system';
import { ReactNode, useMemo } from 'react';

import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsSection = {
  item: TIterableTreeSettingsGroupValues;
  disabled?: boolean;
  indent?: TIndent;
  children: (disabled?: boolean) => ReactNode;
};

export const SettingsGroup = ({
  item,
  disabled: forceDisabled = false,
  indent: currentIndent,
  children,
}: TSettingsSection) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);
  const disabled = useMemo(
    () => item.model.options?.disabled || forceDisabled,
    [item.model.options?.disabled, forceDisabled]
  );

  return (
    <>
      <TreeItem
        title={<Title title={item.model.translationKey} disabled={disabled} />}
        indent={getTreeIndent(indent)}
        disabled={disabled}
      />
      <IndentProvider indent={nextIndent}>{children(disabled)}</IndentProvider>
    </>
  );
};

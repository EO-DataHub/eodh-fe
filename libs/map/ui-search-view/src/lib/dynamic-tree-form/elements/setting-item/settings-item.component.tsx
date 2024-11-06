import { TreeItem } from '@ukri/shared/design-system';
import { ReactNode } from 'react';
import { useWatch } from 'react-hook-form';

import { TreeSettingsItem } from '../../tree-builder/tree.settings-item';
import { Error } from '../error.component';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from '../indent.provider';
import { Title } from '../title.component';
import { useControl } from './use-control.hook';
import { useSlots } from './use-slots.hook';

type TSettingsItemProps = {
  item: TreeSettingsItem;
  indent?: TIndent;
  disabled?: boolean;
  children: (disabled?: boolean) => ReactNode;
};

export const SettingsItem = ({
  item,
  disabled: forceDisabled,
  indent: currentIndent,
  children,
}: TSettingsItemProps) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);
  const { valueControlName, disabled } = useControl(item);
  const enabled = useWatch({ name: valueControlName });
  const slots = useSlots(item, forceDisabled);

  return (
    <>
      <Error name={valueControlName} indent={indent} />
      <TreeItem
        title={<Title title={item.model.translationKey} fontWeight='regular' disabled={disabled || forceDisabled} />}
        slots={slots}
        disabled={disabled || forceDisabled}
        indent={getTreeIndent(indent)}
      />
      <IndentProvider indent={nextIndent}>{children(!enabled || disabled || forceDisabled)}</IndentProvider>
    </>
  );
};

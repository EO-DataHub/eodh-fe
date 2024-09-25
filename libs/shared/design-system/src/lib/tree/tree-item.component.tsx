import { useContext } from 'react';

import { TreeContext, TreeProvider } from './tree.component';
import { TSpacing, TTree } from './tree.model';
import { TreeLevel } from './tree-level/tree-level.component';

type TTreeItemProps = TTree & {
  level?: number;
  expanded?: boolean;
  disabled?: boolean;
  spacing?: TSpacing;
  indent?: TSpacing;
};

export const TreeItem = ({
  title,
  slots,
  children,
  className = '',
  expandable = true,
  level: initialLevel,
  expanded,
  disabled: itemDisabled,
  spacing,
  indent,
}: TTreeItemProps) => {
  const { level: parentLevel, disabled: parentItemDisabled } = useContext(TreeContext);
  const disabled = itemDisabled !== undefined ? itemDisabled : parentItemDisabled;
  const level = initialLevel ? initialLevel + 1 : parentLevel + 1;

  return (
    <TreeProvider
      level={level}
      expandable={expandable}
      expanded={expanded}
      disabled={disabled}
      spacing={spacing}
      indent={indent}
    >
      <TreeLevel title={title} slots={slots} className={className}>
        {children}
      </TreeLevel>
    </TreeProvider>
  );
};

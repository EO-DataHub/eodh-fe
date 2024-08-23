import { useContext } from 'react';

import { TreeContext, TreeProvider } from './tree.component';
import { TTree } from './tree.model';
import { TreeLevel } from './tree-level/tree-level.component';

type TTreeItemProps = TTree & { level?: number };

export const TreeItem = ({
  title,
  slots,
  children,
  className = '',
  expandable = true,
  level: initialLevel,
}: TTreeItemProps) => {
  const { level } = useContext(TreeContext);

  return (
    <TreeProvider level={initialLevel ? initialLevel + 1 : level + 1} expandable={expandable}>
      <TreeLevel title={title} slots={slots} className={className}>
        {children}
      </TreeLevel>
    </TreeProvider>
  );
};

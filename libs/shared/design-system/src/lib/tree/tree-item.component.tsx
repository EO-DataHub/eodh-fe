import { useContext } from 'react';

import { TreeContext, TreeProvider } from './tree.component';
import { TTree } from './tree.model';
import { TreeLevel } from './tree-level/tree-level.component';

export const TreeItem = ({ title, slots, children, className = '', expandable = true }: TTree) => {
  const { level } = useContext(TreeContext);

  return (
    <TreeProvider level={level + 1} expandable={expandable}>
      <TreeLevel title={title} slots={slots} className={className}>
        {children}
      </TreeLevel>
    </TreeProvider>
  );
};

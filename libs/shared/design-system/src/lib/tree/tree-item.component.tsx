import { useContext } from 'react';

import { CollapsableTreeLevel } from './collapsable.component';
import { TreeHeaderSimple } from './header.component';
import { headerClassName } from './header.component.styles';
import { TreeContext } from './tree.component';
import { TTree } from './tree.model';

export const TreeItem = ({ title, icon, children, className = '', collapsable = true }: TTree) => {
  const { level, spacing } = useContext(TreeContext);

  if (level === 0) {
    return (
      <TreeContext.Provider value={{ level: level + 1, spacing }}>
        <div role='tree' aria-orientation='vertical' className={className}>
          <div role='group'>
            <CollapsableTreeLevel title={title} icon={icon} collapsable={collapsable}>
              {children}
            </CollapsableTreeLevel>

            <TreeHeaderSimple title={title} icon={icon}>
              {children}
            </TreeHeaderSimple>
          </div>
        </div>
      </TreeContext.Provider>
    );
  }

  return (
    <TreeContext.Provider value={{ level: level + 1, spacing }}>
      <div className={`w-full overflow-hidden transition-[height] duration-300 ${className}`} role='group'>
        <div className={`ps-7 before:start-3 ${headerClassName}`} role='group'>
          <CollapsableTreeLevel title={title} icon={icon} collapsable={collapsable}>
            {children}
          </CollapsableTreeLevel>
        </div>

        <TreeHeaderSimple title={title} icon={icon}>
          {children}
        </TreeHeaderSimple>
      </div>
    </TreeContext.Provider>
  );
};

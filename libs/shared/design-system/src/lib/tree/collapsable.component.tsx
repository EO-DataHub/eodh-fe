import { PropsWithChildren, useCallback, useContext, useState } from 'react';

import { ArrowDropDown, ArrowDropRight } from '../icon/icons';
import { TreeHeader } from './header.component';
import { getSpacingClassName } from './spacing.component';
import { TreeContext } from './tree.component';
import { TTree } from './tree.model';

const CollapseTree = ({
  collapsed,
  children,
  onClick,
  collapsable = true,
}: PropsWithChildren<{ collapsed?: boolean; collapsable?: boolean; onClick?: (collapsed: boolean) => void }>) => {
  const { spacing } = useContext(TreeContext);

  const collapse = useCallback(() => {
    if (onClick) {
      onClick(!collapsed);
    }
  }, [collapsed, onClick]);

  if (!collapsable) {
    return <div className={`flex items-center w-full cursor-default ${getSpacingClassName(spacing)}`}>{children}</div>;
  }

  return (
    <button
      className={`flex items-center w-full focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${getSpacingClassName(
        spacing
      )}`}
      aria-expanded='true'
      onClick={collapse}
    >
      <div className='flex items-center'>
        <div className='size-6 flex justify-center items-center'>
          {collapsed && <ArrowDropDown />}
          {!collapsed && <ArrowDropRight />}
        </div>

        {children}
      </div>
    </button>
  );
};

export const CollapsableTreeLevel = ({
  title,
  icon,
  children,
  collapsed: initialCollapsed,
  collapsable = true,
}: TTree & { collapsed?: boolean }) => {
  const [collapsed, setCollapsed] = useState(collapsable ? initialCollapsed : true);

  const collapse = useCallback((value: boolean) => {
    setCollapsed(value);
  }, []);

  if (!children) {
    return null;
  }

  return (
    <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
      <CollapseTree collapsed={collapsed} onClick={collapse} collapsable={collapsable}>
        <TreeHeader title={title} icon={icon} />
      </CollapseTree>

      {!!collapsed && children}
    </div>
  );
};

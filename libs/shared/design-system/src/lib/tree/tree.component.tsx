import { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

import { Text } from '../text/text';

type TTree = PropsWithChildren<{ title: string; icon?: ReactNode }>;

const classNames = {
  header: 'relative before:absolute before:top-0 before:w-[1px] before:-ms-px before:h-full before:bg-bright-dark',
};

const TreeContext = createContext({ level: 0 });

export const Tree = ({ children }: PropsWithChildren) => {
  return <TreeContext.Provider value={{ level: 0 }}>{children}</TreeContext.Provider>;
};

const CollapseIcon = () => {
  return (
    <svg
      className='size-4 text-bright-dark stroke-[1.5px]'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
    >
      <path d='M5 12h14'></path>
      <path className='block' d='M12 5v14'></path>
    </svg>
  );
};

const CollapsedIcon = () => {
  return (
    <svg
      className='size-4 text-bright-dark stroke-[1.5px]'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
    >
      <path d='M5 12h14'></path>
    </svg>
  );
};

export const TreeItem = ({ title, icon, children }: TTree) => {
  const { level } = useContext(TreeContext);

  if (level === 0) {
    return (
      <TreeContext.Provider value={{ level: level + 1 }}>
        <div role='tree' aria-orientation='vertical'>
          <div role='group'>
            <CollapsableTreeLevel title={title} icon={icon}>
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
    <TreeContext.Provider value={{ level: level + 1 }}>
      <div className='w-full overflow-hidden transition-[height] duration-300' role='group'>
        <CollapsableTreeLevelWrapper>
          <CollapsableTreeLevel title={title} icon={icon}>
            {children}
          </CollapsableTreeLevel>
        </CollapsableTreeLevelWrapper>
        <TreeHeaderSimple title={title} icon={icon}>
          {children}
        </TreeHeaderSimple>
      </div>
    </TreeContext.Provider>
  );
};

const CollapsableTreeLevel = ({
  title,
  icon,
  children,
  collapsed: initialCollapsed,
}: TTree & { collapsed?: boolean }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const collapse = useCallback((value: boolean) => {
    setCollapsed(value);
  }, []);

  if (!children) {
    return null;
  }

  return (
    <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
      <TreeCollapse collapsed={collapsed} onClick={collapse}>
        <TreeHeader title={title} icon={icon} />
      </TreeCollapse>

      {!!collapsed && children}
    </div>
  );
};

const CollapsableTreeLevelWrapper = ({ children }: PropsWithChildren) => {
  if (!children) {
    return null;
  }

  return (
    <div className={`ps-7 before:start-3 ${classNames.header}`} role='group'>
      {children}
    </div>
  );
};

const TreeHeader = ({ title, icon }: { title: string; icon?: ReactNode }) => {
  return (
    <div className='grow px-1.5 rounded-md cursor-default'>
      <div className='flex items-center gap-x-3'>
        {icon}
        <div className='grow'>
          <Text
            content={title}
            type='p'
            fontSize='medium'
            fontWeight='semibold'
            className='text-neutral-dark py-[3px]'
          />
        </div>
      </div>
    </div>
  );
};

const TreeHeaderSimple = ({ title, icon, children }: TTree) => {
  if (children) {
    return null;
  }

  return (
    <div className={`ms-3 ps-3 before:start-0 ${classNames.header}`} role='group'>
      <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
        <div className='px-2 rounded-md cursor-default' role='treeitem' aria-selected='false'>
          <div className='flex items-center gap-x-3'>
            {icon}
            <div className='grow'>
              <Text
                content={title}
                type='p'
                fontSize='medium'
                fontWeight='regular'
                className='text-neutral-dark py-[3px]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TreeCollapse = ({
  collapsed,
  children,
  onClick,
}: PropsWithChildren<{ collapsed?: boolean; onClick?: (collapsed: boolean) => void }>) => {
  const collapse = () => {
    if (onClick) {
      onClick(!collapsed);
    }
  };

  return (
    <div className='py-0.5 flex items-center gap-x-0.5 w-full'>
      <button
        className='size-6 flex justify-center items-center hover:bg-bright-dark rounded-md focus:outline-none disabled:opacity-50 disabled:pointer-events-none *:hover:text-text-primary'
        aria-expanded='true'
        onClick={collapse}
      >
        {collapsed && <CollapsedIcon />}
        {!collapsed && <CollapseIcon />}
      </button>

      {children}
    </div>
  );
};

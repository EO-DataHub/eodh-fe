import { createContext, isValidElement, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react';

import { ArrowDropDown, ArrowDropRight } from '../icon/icons';
import { Text } from '../text/text';

type TTree = PropsWithChildren<{
  title: string | ReactNode;
  className?: string;
  icon?: ReactNode | { icon: ReactNode; position: 'before' | 'after' }[];
  collapsable?: boolean;
}>;

const classNames = {
  header: 'relative before:absolute before:top-0 before:w-[1px] before:-ms-px before:h-full before:bg-bright-dark',
};

const TreeContext = createContext({ level: 0 });

export const Tree = ({ children }: PropsWithChildren) => {
  return <TreeContext.Provider value={{ level: 0 }}>{children}</TreeContext.Provider>;
};

export const TreeItem = ({ title, icon, children, className = '', collapsable = true }: TTree) => {
  const { level } = useContext(TreeContext);

  if (level === 0) {
    return (
      <TreeContext.Provider value={{ level: level + 1 }}>
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
    <TreeContext.Provider value={{ level: level + 1 }}>
      <div className={`w-full overflow-hidden transition-[height] duration-300 ${className}`} role='group'>
        <CollapsableTreeLevelWrapper>
          <CollapsableTreeLevel title={title} icon={icon} collapsable={collapsable}>
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
      <TreeCollapse collapsed={collapsed} onClick={collapse} collapsable={collapsable}>
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

const getIcons = (icons: TTree['icon'] | undefined, position: 'before' | 'after'): ReactNode | ReactNode[] | null => {
  if (!icons) {
    return null;
  }

  switch (position) {
    case 'before': {
      if (Array.isArray(icons)) {
        const beforeIcons = icons.filter((i) => i.position === 'before').map((i) => i.icon);
        return beforeIcons.length ? beforeIcons : null;
      }

      return icons;
    }

    case 'after': {
      if (Array.isArray(icons)) {
        const afterIcons = icons.filter((i) => i.position === 'after').map((i) => i.icon);
        return afterIcons.length ? afterIcons : null;
      }

      return null;
    }
  }
};

const Title = ({
  title,
  className = '',
  fontWeight,
}: {
  title: TTree['title'];
  className?: string;
  fontWeight: 'semibold' | 'regular';
}) => {
  if (isValidElement(title)) {
    return title;
  }

  return (
    <Text
      content={title}
      type='p'
      fontSize='medium'
      fontWeight={fontWeight}
      className={`text-neutral-dark ${className}`}
    />
  );
};

const TreeHeader = ({ title, icon }: { title: TTree['title']; icon?: TTree['icon'] }) => {
  const beforeIcons = getIcons(icon, 'before');
  const afterIcons = getIcons(icon, 'after');

  return (
    <div className='grow px-1.5 rounded-md cursor-default'>
      <div className='flex items-center gap-x-3'>
        {beforeIcons && <div className='flex flex-row items-center gap-x-2'>{beforeIcons}</div>}
        <div className='grow'>
          <Title title={title} fontWeight='semibold' className='py-[3px]' />
        </div>
        {afterIcons && <div className='flex flex-row items-center gap-x-2'>{afterIcons}</div>}
      </div>
    </div>
  );
};

const TreeHeaderSimple = ({ title, icon, children }: TTree) => {
  if (children) {
    return null;
  }

  const beforeIcons = getIcons(icon, 'before');
  const afterIcons = getIcons(icon, 'after');

  return (
    <div className={`ms-3 ps-3 before:start-0 ${classNames.header}`} role='group'>
      <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
        <div className='px-2 rounded-md cursor-default' role='treeitem' aria-selected='false'>
          <div className='flex items-center gap-x-3'>
            {beforeIcons && <div className='flex flex-row items-center gap-x-2'>{beforeIcons}</div>}
            <div className='grow'>
              <Title title={title} fontWeight='regular' className='py-4' />
            </div>
            {afterIcons && <div className='flex flex-row items-center gap-x-2'>{afterIcons}</div>}
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
  collapsable = true,
}: PropsWithChildren<{ collapsed?: boolean; collapsable?: boolean; onClick?: (collapsed: boolean) => void }>) => {
  const collapse = () => {
    if (onClick) {
      onClick(!collapsed);
    }
  };

  if (!collapsable) {
    return <div className='py-4 flex items-center gap-x-0.5 w-full'>{children}</div>;
  }

  return (
    <div className='py-4 flex items-center gap-x-0.5 w-full'>
      <button
        className='size-6 flex justify-center items-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none'
        aria-expanded='true'
        onClick={collapse}
      >
        {collapsed && <ArrowDropDown />}
        {!collapsed && <ArrowDropRight />}
      </button>

      {children}
    </div>
  );
};

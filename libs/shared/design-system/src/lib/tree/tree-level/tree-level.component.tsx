import { useCallback, useContext } from 'react';

import { Header } from '../header/header.component';
import { HeaderSimple } from '../header/header-simple.component';
import { TreeContext } from '../tree.component';
import { TTree } from '../tree.model';
import { Expand } from './expand.component';

const classNames = {
  Subtree: () =>
    'ps-7 before:start-3 relative before:absolute before:top-0 before:w-[1px] before:-ms-px before:h-full before:bg-bright-dark',
  TreeLevel: (className: string) => `w-full overflow-hidden transition-[height] duration-300 ${className}`,
};

type TExpandHeaderProps = TTree & { expanded?: boolean; onExpand: (expanded: boolean) => void };

const ExpandHeader = ({ title, slots, expanded, onExpand }: TExpandHeaderProps) => {
  const { expandable } = useContext(TreeContext);

  const expand = useCallback(() => {
    onExpand(!expanded);
  }, [expanded, onExpand]);

  if (!slots) {
    return (
      <Expand expanded={expanded} onClick={onExpand} expandable={expandable} className='w-full'>
        <Header title={title} />
      </Expand>
    );
  }

  return (
    <div className='flex w-full items-center justify-between'>
      <Expand expanded={expanded} onClick={onExpand} expandable={expandable} className='w-auto' />
      <Header title={title} slots={slots} onClick={expand} />
    </div>
  );
};

type TSubtreeProps = TTree & { expanded?: boolean; onExpand: (expanded: boolean) => void };

export const Subtree = ({ title, slots, children, expanded, className = '', onExpand }: TSubtreeProps) => {
  const { expandable } = useContext(TreeContext);

  if (!children) {
    return null;
  }

  return (
    <span className={`block ${className}`}>
      <ExpandHeader expanded={expanded} expandable={expandable} slots={slots} title={title} onExpand={onExpand} />

      {!!expanded && children}
    </span>
  );
};

type TCollapsableTreeLevelProps = TTree & { expanded?: boolean };

export const TreeLevel = ({ title, slots, children, className = '' }: TCollapsableTreeLevelProps) => {
  const { level, disabled, expanded, setExpanded } = useContext(TreeContext);

  const toggle = useCallback(
    (value: boolean) => {
      if (disabled) {
        return;
      }

      setExpanded(value);
    },
    [disabled, setExpanded]
  );

  return (
    <ul className={level !== 1 ? classNames.TreeLevel(className) : className}>
      <li tabIndex={0}>
        <HeaderSimple title={title} slots={slots}>
          {children}
        </HeaderSimple>

        <Subtree
          title={title}
          slots={slots}
          expanded={expanded}
          onExpand={toggle}
          className={level !== 1 ? classNames.Subtree() : 'px-4'}
        >
          {children}
        </Subtree>
      </li>
    </ul>
  );
};

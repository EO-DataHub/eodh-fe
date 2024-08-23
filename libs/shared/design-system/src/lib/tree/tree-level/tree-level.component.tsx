import { useCallback, useContext } from 'react';

import { Header } from '../header/header.component';
import { HeaderSimple } from '../header/header-simple.component';
import { TreeContext } from '../tree.component';
import { TTree } from '../tree.model';
import { Expand } from './expand.component';

type TCollapsableTreeLevel = TTree & { expanded?: boolean };
type TSubtreeProps = TTree & { expanded?: boolean; onExpand: (expanded: boolean) => void };

const classNames = {
  Subtree: () =>
    'ps-7 before:start-3 relative before:absolute before:top-0 before:w-[1px] before:-ms-px before:h-full before:bg-bright-dark',
  TreeLevel: (className: string) => `w-full overflow-hidden transition-[height] duration-300 ${className}`,
};

export const Subtree = ({ title, slots, children, expanded, className = '', onExpand }: TSubtreeProps) => {
  const { expandable } = useContext(TreeContext);

  if (!children) {
    return null;
  }

  return (
    <span className={`block ${className}`}>
      <Expand expanded={expanded} onClick={onExpand} expandable={expandable}>
        <Header title={title} slots={slots} />
      </Expand>

      {!!expanded && children}
    </span>
  );
};

export const TreeLevel = ({ title, slots, children, className = '' }: TCollapsableTreeLevel) => {
  const { level, expanded, setExpanded } = useContext(TreeContext);

  const toggle = useCallback(
    (value: boolean) => {
      setExpanded(value);
    },
    [setExpanded]
  );

  return (
    <ul className={level !== 1 ? classNames.TreeLevel(className) : className}>
      <li tabIndex={0}>
        <Subtree
          title={title}
          slots={slots}
          expanded={expanded}
          onExpand={toggle}
          className={level !== 1 ? classNames.Subtree() : 'px-4'}
        >
          {children}
        </Subtree>

        <HeaderSimple title={title} slots={slots}>
          {children}
        </HeaderSimple>
      </li>
    </ul>
  );
};

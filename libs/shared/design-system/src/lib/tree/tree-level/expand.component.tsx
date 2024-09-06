import { PropsWithChildren, useCallback, useContext } from 'react';

import { ArrowDropDown, ArrowDropRight } from '../../icon/icons';
import { getSpacingClassName } from '../spacing.component';
import { TreeContext } from '../tree.component';

type TCollapseTree = PropsWithChildren<{
  expanded?: boolean;
  className?: string;
  expandable?: boolean;
  onClick?: (expanded: boolean) => void;
}>;

export const Expand = ({ expanded, children, onClick, expandable = true, className }: TCollapseTree) => {
  const { spacing } = useContext(TreeContext);

  const expand = useCallback(() => {
    if (onClick) {
      onClick(!expanded);
    }
  }, [expanded, onClick]);

  if (!expandable) {
    return null;
  }

  return (
    <button
      type='button'
      className={`flex items-center focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${getSpacingClassName(
        spacing
      )} ${className}`}
      onClick={expand}
    >
      <div className='flex items-center w-full'>
        <div className='size-6 flex justify-center items-center text-neutral-light'>
          {expanded && <ArrowDropDown />}
          {!expanded && <ArrowDropRight />}
        </div>

        {children}
      </div>
    </button>
  );
};

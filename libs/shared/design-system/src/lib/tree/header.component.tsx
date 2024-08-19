import { isValidElement, PropsWithChildren, ReactNode, useContext } from 'react';

import { Text } from '../text/text';
import { headerClassName } from './header.component.styles';
import { getSpacingClassName } from './spacing.component';
import { TreeContext } from './tree.component';
import { TIcon } from './tree.model';

const getIcons = (icons: TIcon | undefined, position: 'before' | 'after'): ReactNode | ReactNode[] | null => {
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
  title: string | ReactNode;
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

export const TreeHeader = ({ title, icon }: { title: string | ReactNode; icon?: TIcon }) => {
  const beforeIcons = getIcons(icon, 'before');
  const afterIcons = getIcons(icon, 'after');

  return (
    <div className='grow pr-4 rounded-md'>
      <div className='flex items-center gap-x-3'>
        {beforeIcons && <div className='flex flex-row items-center gap-x-2'>{beforeIcons}</div>}
        <div className='grow'>
          <Title title={title} fontWeight='semibold' />
        </div>
        {afterIcons && <div className='flex flex-row items-center gap-x-2'>{afterIcons}</div>}
      </div>
    </div>
  );
};

export const TreeHeaderSimple = ({
  title,
  icon,
  children,
}: PropsWithChildren<{ title: string | ReactNode | null; icon: TIcon }>) => {
  const { spacing } = useContext(TreeContext);

  if (children) {
    return null;
  }

  const beforeIcons = getIcons(icon, 'before');
  const afterIcons = getIcons(icon, 'after');

  return (
    <div className={`ms-4 ps-3 before:start-[-4px] ${getSpacingClassName(spacing)} ${headerClassName}`} role='group'>
      <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
        <div className='pr-4 rounded-md cursor-default' role='treeitem' aria-selected='false'>
          <div className='flex items-center gap-x-3'>
            {beforeIcons && <div className='flex flex-row items-center gap-x-2'>{beforeIcons}</div>}
            {title && (
              <div className='grow'>
                <Title title={title} fontWeight='regular' />
              </div>
            )}
            {afterIcons && <div className='flex flex-row items-center gap-x-2'>{afterIcons}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

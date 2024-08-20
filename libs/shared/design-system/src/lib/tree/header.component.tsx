// eslint-disable-next-line @nx/enforce-module-boundaries
import { TTranslation } from '@ukri/shared/utils/translate';
import { Fragment, isValidElement, memo, PropsWithChildren, ReactNode, useContext } from 'react';

import { Text } from '../text/text';
import { headerClassName } from './header.component.styles';
import { getSpacingClassName } from './spacing.component';
import { TreeContext } from './tree.component';
import { TIcon, TTree } from './tree.model';

const Icons = memo(
  ({ icons, position }: { icons: TIcon | undefined; position: 'before' | 'after' }): ReactNode | ReactNode[] | null => {
    if (!icons) {
      return null;
    }

    const Wrapper = ({ children }: PropsWithChildren) => {
      return <div className='flex flex-row items-center gap-x-2'>{children}</div>;
    };

    switch (position) {
      case 'before': {
        if (Array.isArray(icons)) {
          const beforeIcons = icons.filter((i) => i.position === 'before');
          return (
            <Wrapper>
              {beforeIcons.length ? beforeIcons.map((i) => <Fragment key={i.key}>{i.icon}</Fragment>) : null}
            </Wrapper>
          );
        }

        return <Wrapper>{icons}</Wrapper>;
      }

      case 'after': {
        if (Array.isArray(icons)) {
          const afterIcons = icons.filter((i) => i.position === 'after');
          return (
            <Wrapper>
              {afterIcons.length ? afterIcons.map((i) => <Fragment key={i.key}>{i.icon}</Fragment>) : null}
            </Wrapper>
          );
        }

        return null;
      }
    }
  }
);

const Title = ({
  title,
  className = '',
  fontWeight,
}: Pick<TTree, 'title' | 'className'> & { fontWeight: 'bold' | 'semibold' | 'regular' }) => {
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

export const TreeHeader = memo(({ title, icon }: { title: TTranslation | ReactNode; icon?: TIcon }) => {
  return (
    <div className='grow pr-4 rounded-md'>
      <div className='flex items-center gap-x-3'>
        <Icons icons={icon} position='before' />
        <div className='grow'>
          <Title title={title} fontWeight='semibold' />
        </div>
        <Icons icons={icon} position='after' />
      </div>
    </div>
  );
});

export const TreeHeaderSimple = memo(
  ({ title, icon, children }: PropsWithChildren<{ title: TTranslation | ReactNode | null; icon: TIcon }>) => {
    const { spacing } = useContext(TreeContext);

    if (children) {
      return null;
    }

    return (
      <div className={`ms-4 ps-3 before:start-[-4px] ${getSpacingClassName(spacing)} ${headerClassName}`} role='group'>
        <div className='active' role='treeitem' aria-expanded='true' aria-selected='true'>
          <div className='pr-4 rounded-md cursor-default' role='treeitem' aria-selected='false'>
            <div className='flex items-center gap-x-3'>
              <Icons icons={icon} position='before' />
              {title && (
                <div className='grow'>
                  <Title title={title} fontWeight='regular' />
                </div>
              )}
              <Icons icons={icon} position='after' />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

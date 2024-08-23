import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useMemo } from 'react';

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name?: string }>;

export const CategoryItem = ({ title, name, children }: TSatelliteItemProps) => {
  const slots = useMemo(
    (): TSlots => [{ position: 'title:after', element: <Checkbox name={name ? name : title} />, key: 'checkbox' }],
    [title, name]
  );

  return (
    <TreeItem title={title} slots={slots}>
      {children}
    </TreeItem>
  );
};

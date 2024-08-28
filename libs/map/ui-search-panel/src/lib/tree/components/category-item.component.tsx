import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TForm } from '../form.model';

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name: FieldPath<TForm> }>;

export const CategoryItem = ({ title, name, children }: TSatelliteItemProps) => {
  const { register } = useFormContext<TForm>();
  const slots = useMemo(
    (): TSlots => [{ position: 'title:after', element: <Checkbox {...register(name)} />, key: 'checkbox' }],
    [register, name]
  );

  return (
    <TreeItem title={title} slots={slots} expanded={true}>
      {children}
    </TreeItem>
  );
};

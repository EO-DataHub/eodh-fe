import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { ChangeEvent, PropsWithChildren, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TForm } from '../form.model';

type TSatelliteItemProps = PropsWithChildren<{
  title: ParseKeys;
  name: FieldPath<TForm>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}>;

export const CategoryItem = ({ title, name, children, onChange }: TSatelliteItemProps) => {
  const { register } = useFormContext<TForm>();
  const slots = useMemo(
    (): TSlots => [
      { position: 'title:after', element: <Checkbox {...register(name)} onChange={onChange} />, key: 'checkbox' },
    ],
    [register, name, onChange]
  );

  return (
    <TreeItem title={title} slots={slots} expanded={true}>
      {children}
    </TreeItem>
  );
};

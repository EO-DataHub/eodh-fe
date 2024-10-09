import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { ChangeEvent, PropsWithChildren, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';

type TSatelliteItemProps = PropsWithChildren<{
  title: ParseKeys;
  name: FieldPath<TInitialForm>;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: 'Check' | 'Remove';
}>;

export const CategoryItem = ({ title, name, disabled, children, onChange, icon }: TSatelliteItemProps) => {
  const { register } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: <Checkbox {...register(name)} onChange={onChange} disabled={disabled} icon={icon} />,
        key: 'checkbox',
      },
    ],
    [register, name, disabled, icon, onChange]
  );

  return (
    <TreeItem title={title} slots={slots} expanded={true} disabled={disabled}>
      {children}
    </TreeItem>
  );
};

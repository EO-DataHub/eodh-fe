import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { ChangeEvent, PropsWithChildren, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';

type TSatelliteItemProps = PropsWithChildren<{
  title: ParseKeys;
  name: FieldPath<TFormDefaultValues>;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}>;

export const CategoryItem = ({ title, name, disabled, children, onChange }: TSatelliteItemProps) => {
  const { register } = useFormContext<TFormDefaultValues>();
  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: <Checkbox {...register(name)} onChange={onChange} disabled={disabled} />,
        key: 'checkbox',
      },
    ],
    [register, name, disabled, onChange]
  );

  return (
    <TreeItem title={title} slots={slots} expanded={true}>
      {children}
    </TreeItem>
  );
};

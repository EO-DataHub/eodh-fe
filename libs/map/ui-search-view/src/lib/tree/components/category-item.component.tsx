import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { ChangeEvent, PropsWithChildren, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { useSearchView } from '../../search-view.context';

type TSatelliteItemProps = PropsWithChildren<{
  title: ParseKeys;
  name: FieldPath<TInitialForm>;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  icon?: 'Check' | 'Remove';
}>;

export const CategoryItem = ({ title, name, disabled, children, onChange, icon }: TSatelliteItemProps) => {
  const { isDisabled } = useSearchView();
  const { register } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: (
          <Checkbox {...register(name)} onChange={onChange} disabled={isDisabled(disabled, 'data-sets')} icon={icon} />
        ),
        key: 'checkbox',
      },
    ],
    [register, name, onChange, isDisabled, disabled, icon]
  );

  return (
    <TreeItem title={title} slots={slots} expanded={true} disabled={isDisabled(disabled, 'data-sets')}>
      {children}
    </TreeItem>
  );
};

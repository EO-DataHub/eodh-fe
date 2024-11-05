import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { get, useFormContext } from 'react-hook-form';

import { IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { Error } from './error.component';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsItemProps = PropsWithChildren<{
  item: IDynamicTreeSettingItem;
  indent?: TIndent;
}>;

export const SettingsItem = ({ item, indent: currentIndent, children }: TSettingsItemProps) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();
  const valueControlName = useMemo(
    () => item.controls?.find((control) => control.type === 'checkbox' || control.type === 'radio')?.name || '',
    [item.controls]
  );
  const state = useMemo(() => (get(errors, valueControlName) ? 'error' : undefined), [errors, valueControlName]);

  const validateFields = useCallback(() => {
    trigger();
  }, [trigger]);

  const slots = useMemo((): TSlots | undefined => {
    if (!item.controls?.length) {
      return;
    }

    return item.controls
      .filter((control) => control.type === 'checkbox' || control.type === 'radio')
      .map((control) => ({
        position: 'title:after',
        element: (
          <Checkbox
            {...register(control.name, { onChange: validateFields })}
            state={state}
            disabled={item.options?.disabled}
          />
        ),
        key: 'checkbox',
      }));
  }, [item.controls, item.options?.disabled, register, state, validateFields]);

  return (
    <>
      <Error name={valueControlName} indent={indent} />
      <TreeItem
        title={<Title title={item.translationKey} fontWeight='regular' disabled={item.options?.disabled} />}
        slots={slots}
        disabled={item.options?.disabled}
        indent={getTreeIndent(indent)}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};

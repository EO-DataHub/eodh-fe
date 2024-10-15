import { Checkbox, TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import get from 'lodash/get';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { useSearchView } from '../../search-view.context';
import { Error } from './error.component';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsItemProps = PropsWithChildren<{
  title: ParseKeys;
  name: FieldPath<TInitialForm | TUpdateForm>;
  disabled?: boolean;
  indent?: TIndent;
}>;

export const SettingsItem = ({ title, name, disabled, indent: currentIndent, children }: TSettingsItemProps) => {
  const { isDisabled } = useSearchView();
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const state = useMemo(() => (get(errors, name) ? 'error' : undefined), [errors, name]);
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);

  const validateFields = useCallback(() => {
    trigger();
  }, [trigger]);

  return (
    <>
      <Error name={name} indent={indent} />
      <TreeItem
        title={<Title title={title} fontWeight='regular' disabled={isDisabled(disabled, 'data-sets')} />}
        slots={[
          {
            position: 'title:after',
            element: (
              <Checkbox
                {...register(name, { onChange: validateFields })}
                state={state}
                disabled={isDisabled(disabled, 'data-sets')}
              />
            ),
            key: 'checkbox',
          },
        ]}
        disabled={isDisabled(disabled, 'data-sets')}
        indent={getTreeIndent(indent)}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};

import { Checkbox, TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { Error } from './error.component';
import { Title } from './title.component';

type TSettingsItemProps = { title: ParseKeys; name: FieldPath<TFormDefaultValues>; disabled?: boolean };

export const SettingsItem = ({ title, name, disabled }: TSettingsItemProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<TFormDefaultValues>();
  const state = useMemo(() => (get(errors, name) ? 'error' : undefined), [errors, name]);

  const validateFields = useCallback(() => {
    trigger();
  }, [trigger]);

  return (
    <>
      <Error name={name} />
      <TreeItem
        title={<Title title={title} fontWeight='regular' disabled={disabled} />}
        slots={[
          {
            position: 'title:after',
            element: <Checkbox {...register(name, { onChange: validateFields })} state={state} disabled={disabled} />,
            key: 'checkbox',
          },
        ]}
      />
    </>
  );
};

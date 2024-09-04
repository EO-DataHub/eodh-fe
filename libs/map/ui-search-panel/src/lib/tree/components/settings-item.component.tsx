import { Checkbox, Text, TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import get from 'lodash/get';
import { useCallback, useMemo } from 'react';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TForm } from '../form.model';
import { Title } from './title.component';

type TErrorProps = {
  name: FieldPath<TForm>;
};

const Error = ({ name }: TErrorProps) => {
  const {
    formState: { errors },
  } = useFormContext<TForm>();
  const error = useMemo(() => get(errors, name), [errors, name]);

  if (!error || !error.message) {
    return null;
  }

  return (
    <TreeItem title={<Text content={error.message} fontSize='medium' fontWeight='semibold' className='text-error' />} />
  );
};

type TSettingsItemProps = { title: ParseKeys; name: FieldPath<TForm>; disabled?: boolean };

export const SettingsItem = ({ title, name, disabled }: TSettingsItemProps) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<TForm>();
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

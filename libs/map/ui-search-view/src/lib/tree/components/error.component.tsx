import { Text, TreeItem } from '@ukri/shared/design-system';
import get from 'lodash/get';
import { FieldPath, useFormState } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';

type TErrorProps = {
  name: FieldPath<TFormDefaultValues>;
};

export const Error = ({ name }: TErrorProps) => {
  const { errors } = useFormState<TFormDefaultValues>({ name });
  const error = get(errors, name);

  if (!error || !error.message) {
    return null;
  }

  return (
    <TreeItem title={<Text content={error.message} fontSize='medium' fontWeight='semibold' className='text-error' />} />
  );
};

import { Text, TreeItem } from '@ukri/shared/design-system';
import get from 'lodash/get';
import { FieldPath, useFormState } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { getTreeIndent, TIndent } from './indent.provider';

type TErrorProps = {
  name: FieldPath<TFormDefaultValues>;
  indent?: TIndent;
};

export const Error = ({ name, indent }: TErrorProps) => {
  const { errors } = useFormState<TFormDefaultValues>({ name });
  const error = get(errors, name);

  if (!error || !error.message) {
    return null;
  }

  return (
    <TreeItem
      title={<Text content={error.message} fontSize='medium' fontWeight='semibold' className='text-error' />}
      indent={getTreeIndent(indent)}
    />
  );
};

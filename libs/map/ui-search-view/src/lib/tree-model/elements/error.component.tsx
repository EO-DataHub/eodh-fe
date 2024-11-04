import { Text, TreeItem } from '@ukri/shared/design-system';
import get from 'lodash/get';
import { FieldPath, useFormState } from 'react-hook-form';

import { TInitialForm } from '../../schema/form.schema';
import { getTreeIndent, TIndent } from './indent.provider';

type TErrorProps = {
  name: FieldPath<TInitialForm>;
  indent?: TIndent;
};

export const Error = ({ name, indent }: TErrorProps) => {
  const { errors } = useFormState<TInitialForm>({ name });
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

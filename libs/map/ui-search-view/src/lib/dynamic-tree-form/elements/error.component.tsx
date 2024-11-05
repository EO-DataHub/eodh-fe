import { Text, TreeItem } from '@ukri/shared/design-system';
import get from 'lodash/get';
import isString from 'lodash/isString';
import { useFormState } from 'react-hook-form';

import { getTreeIndent, TIndent } from './indent.provider';

type TErrorProps = {
  name: string;
  indent?: TIndent;
};

export const Error = ({ name, indent }: TErrorProps) => {
  const { errors } = useFormState({ name });
  const error = get(errors, name);

  if (!error || !error.message || !isString(error.message)) {
    return null;
  }

  return (
    <TreeItem
      title={<Text content={error.message} fontSize='medium' fontWeight='semibold' className='text-error' />}
      indent={getTreeIndent(indent)}
    />
  );
};

import { TFunction } from 'i18next';
import { useMemo, useState } from 'react';
import { FileError } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

import { TSize } from '../size.utils';
import { maxFileSizeValidator } from './max-size.validator';

type TGetValidationErrorsProps = {
  maxSize?: TSize;
  t: TFunction;
  setErrors: (errors: FileError[]) => void;
};

const getValidationErrors =
  ({ maxSize, t, setErrors }: TGetValidationErrorsProps) =>
  (file: File | File[]): FileError[] | null => {
    let errors: FileError[] = [];

    if (maxSize !== undefined) {
      errors = [...errors, ...maxFileSizeValidator({ maxSize, t })(file)];
    }

    setErrors(errors);

    return errors.length ? errors : null;
  };

export const useValidators = () => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState<FileError[]>([]);

  return useMemo(
    () => ({
      errors,
      validators: ({ maxSize }: { maxSize?: TSize }) => getValidationErrors({ maxSize, t, setErrors }),
    }),
    [errors, t]
  );
};

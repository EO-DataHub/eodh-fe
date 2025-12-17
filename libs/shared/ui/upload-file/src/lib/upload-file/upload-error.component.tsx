import { Text } from '@ukri/shared/design-system';
import { FC, ReactNode } from 'react';
import { FileError } from 'react-dropzone';

export type TReactNode =
  | Exclude<ReactNode, string | Iterable<ReactNode>>
  | Iterable<Exclude<ReactNode, string | Iterable<ReactNode>>>;

interface IUploadErrorProps {
  helperText?: TReactNode | string;
  validationErrors: readonly FileError[];
}

export const UploadError: FC<IUploadErrorProps> = ({ helperText, validationErrors }) => {
  const firstError = helperText ? helperText : [...validationErrors]?.shift()?.message;

  if (firstError) {
    return <Text type='p' fontSize='medium' fontWeight='regular' className='text-error-main' content={firstError} />;
  }

  return null;
};

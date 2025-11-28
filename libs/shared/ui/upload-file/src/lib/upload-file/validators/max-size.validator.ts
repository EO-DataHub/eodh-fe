import { TFunction } from 'i18next';
import { ErrorCode, FileError } from 'react-dropzone';

import { formatSize, parseSizeToBytes, TSize } from '../size.utils';

type TMaxFileSizeValidatorProps = {
  maxSize: TSize;
  t: TFunction;
};

export const maxFileSizeValidator =
  ({ maxSize, t }: TMaxFileSizeValidatorProps) =>
  (file: File | File[]): FileError[] => {
    const filesArray = Array.isArray(file) ? file : [file];
    const maxBytes = parseSizeToBytes(maxSize);

    if (maxBytes === undefined) {
      return [];
    }

    const errors: FileError[] = [];

    for (const currentFile of filesArray) {
      if (currentFile.size > maxBytes) {
        const message = t('GLOBAL.COMPONENT.UPLOAD_IMAGE.ERROR.MAX_SIZE', {
          fileName: currentFile.name,
          fileSize: formatSize(currentFile.size),
          maxSize,
        });
        errors.push({
          message,
          code: ErrorCode.FileTooLarge,
        });
      }
    }

    if (errors.length === 0) {
      return [];
    }

    return Array.isArray(file) ? errors : [[...errors].shift()].filter((error): error is FileError => !!error);
  };

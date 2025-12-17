import { Icon } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { FileWithPath } from 'react-dropzone';

import { formatSize } from './size.utils';

const isFile = (file: File | string): file is File => file instanceof File;

interface IFileInformation {
  file: FileWithPath | string;
  disabled?: boolean;
  onRemoveFile?: (file: File | string) => void;
}

export const FileInformation = ({ file, disabled = false, onRemoveFile }: IFileInformation) => {
  const fileName = useMemo(() => (isFile(file) ? file.name : file), [file]);

  const removeFile = useCallback(() => {
    if (onRemoveFile && !disabled) {
      onRemoveFile(file);
    }
  }, [file, disabled, onRemoveFile]);

  return (
    <div
      className={`
        border border-bright-dark rounded box-border relative
        flex flex-row items-center justify-center
        px-3.5 py-4
        ${disabled ? 'cursor-default' : 'hover:border-text-primary cursor-default'}
      `}
    >
      <div className='flex flex-row items-center flex-grow gap-4'>
        <Icon name='Upload' width={24} height={24} className={disabled ? 'text-text-disabled' : 'text-primary'} />
        <div className='flex flex-col'>
          <p className={`text-base font-normal ${disabled ? 'text-text-disabled' : 'text-text-primary'}`}>{fileName}</p>
          {isFile(file) && (
            <p className={`text-sm font-normal ${disabled ? 'text-text-disabled' : 'text-text-light'}`}>
              {formatSize(file.size)}
            </p>
          )}
        </div>
      </div>
      <Icon
        name='Close'
        width={24}
        height={24}
        className={
          disabled
            ? 'text-text-disabled cursor-default p-0.5 rounded-2xl'
            : 'text-error cursor-pointer hover:bg-error-light p-0.5 rounded-2xl'
        }
        onClick={removeFile}
      />
    </div>
  );
};

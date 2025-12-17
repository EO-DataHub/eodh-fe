import clsx from 'clsx';
import { ElementType, FC, ForwardedRef, RefObject, useImperativeHandle, useMemo, useRef } from 'react';
import { Accept, FileError, useDropzone } from 'react-dropzone';

import { FileInformation } from './file-information.component';
import { parseSizeToBytes, TSize } from './size.utils';
import { TReactNode, UploadError } from './upload-error.component';
import { IMultiFilesProps, ISingleFileProps, useFiles } from './use-files.hook';
import { useValidators } from './validators/use-validators.hook';

type TValidator = <T extends File>(file: T) => FileError | readonly FileError[] | null;

interface IBase {
  required?: boolean;
  disabled?: boolean;
  name: string;
  error?: boolean;
  helperText?: TReactNode | string;
  ref?: ForwardedRef<HTMLInputElement | undefined>;
  accept?: Accept;
  maxSize?: TSize;
  slots?: {
    InfoBoxCmp: ElementType;
  };
  validator?: TValidator;
}

export type TUploadSingleProps = IBase & { uploadedFiles?: string } & Omit<ISingleFileProps, 'ref'>;
export type TUploadMultipleProps = IBase & { uploadedFiles?: string[] } & Omit<IMultiFilesProps, 'ref'>;

export type TUploadFileProps = TUploadSingleProps | TUploadMultipleProps;

const getFileUniqueId = (file: File | string) =>
  file instanceof File ? `${file.name}-${file.type}-${file.size}` : file;

const isMultiUploadParam = (params: Pick<TUploadFileProps, 'multi'>): params is TUploadMultipleProps => {
  return params.multi;
};

const getParams = (
  params: Pick<TUploadFileProps, 'multi' | 'value' | 'onChange'>,
  ref: RefObject<HTMLInputElement | null>
): IMultiFilesProps | ISingleFileProps => {
  if (isMultiUploadParam(params)) {
    return {
      ref,
      multi: params.multi,
      value: params.value,
      onChange: params.onChange,
    };
  }

  return {
    ref,
    multi: params.multi,
    value: params.value,
    onChange: params.onChange,
  } as ISingleFileProps;
};

const getBackgroundColor = (isDragAccept?: boolean, isDragReject?: boolean): string => {
  if (isDragAccept) {
    return 'bg-success/20';
  }

  if (isDragReject) {
    return 'bg-error/20';
  }

  return 'bg-background-main';
};

export const UploadFile: FC<TUploadFileProps> = ({
  required,
  disabled,
  error,
  helperText,
  name,
  multi,
  slots,
  onChange,
  value,
  ref,
  accept,
  maxSize,
}) => {
  const innerInputRef = useRef<HTMLInputElement | null>(null);
  const { validators, errors: validationErrors } = useValidators();
  const { files, addFile, removeFile } = useFiles(getParams({ multi, value, onChange }, innerInputRef));
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive, isFocused } = useDropzone({
    onDrop: addFile,
    accept,
    validator: validators({ maxSize }),
    multiple: multi,
    maxSize: parseSizeToBytes(maxSize),
  });
  const hasError = useMemo(() => !!error || !!validationErrors.length, [error, validationErrors]);

  useImperativeHandle(ref, () => (innerInputRef.current ? innerInputRef.current : undefined));

  if (!multi && !!files.length) {
    return (
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full flex flex-col gap-4'>
          {files.map((file) => (
            <FileInformation key={getFileUniqueId(file)} file={file} disabled={disabled} onRemoveFile={removeFile} />
          ))}
        </div>
        {hasError && <UploadError helperText={helperText} validationErrors={validationErrors} />}
      </div>
    );
  }

  const dropzoneClasses = clsx(
    'p-6 rounded box-border cursor-pointer',
    'flex flex-col justify-center',
    'transition-colors',
    isFocused ? 'border-2' : 'border',
    hasError
      ? 'border-error hover:border-error focus-visible:border-error focus-visible:outline-error'
      : 'border-bright-dark hover:border-text-primary focus-visible:border-text-primary focus-visible:outline-primary',
    getBackgroundColor(isDragActive && isDragAccept, isDragActive && isDragReject)
  );

  return (
    <div className='w-full flex flex-col gap-4'>
      <div {...getRootProps()} className={dropzoneClasses}>
        <input type='file' name={name} required={required} style={{ opacity: 0, height: 0 }} ref={innerInputRef} />
        <input {...getInputProps()} />

        {!!slots?.InfoBoxCmp && <slots.InfoBoxCmp />}
      </div>

      {!!files.length && (
        <div className='w-full flex flex-col gap-4'>
          {files.map((file) => (
            <FileInformation key={getFileUniqueId(file)} file={file} disabled={disabled} onRemoveFile={removeFile} />
          ))}
        </div>
      )}
      {hasError && <UploadError helperText={helperText} validationErrors={validationErrors} />}
    </div>
  );
};

import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { RefObject, useCallback, useMemo, useState } from 'react';

const isFileEqual = (file1: File | string, file2: File | string) => {
  if (isString(file1) && isString(file2)) {
    return file1 === file2;
  }

  if (file1 instanceof File && file2 instanceof File) {
    return file1.name === file2.name && file1.type === file2.type && file1.size === file2.size;
  }

  return false;
};

const fileExists = (files: (File | string)[], file: File | string) => {
  return files.some((currentFile) => isFileEqual(currentFile, file));
};

const getInitialState = (files: (File | string)[] | File | string | undefined) => {
  if (isArray(files)) {
    return files;
  }

  return files ? [files] : [];
};

interface IUploadSingleBaseProps {
  value?: string | File;
  multi: false | never;
  onChange?: (file: File | string | undefined) => void;
}

interface IUploadMultiBaseProps {
  value?: (string | File)[];
  multi: true;
  onChange?: (file: (File | string)[]) => void;
}

export interface ISingleFileProps extends IUploadSingleBaseProps {
  ref: RefObject<HTMLInputElement | null>;
}

export interface IMultiFilesProps extends IUploadMultiBaseProps {
  ref: RefObject<HTMLInputElement | null>;
}

export type TUseFilesProps = ISingleFileProps | IMultiFilesProps;

export const useFiles = ({ multi, value, ref, onChange }: TUseFilesProps) => {
  const [files, setFiles] = useState<(File | string)[]>(getInitialState(value));

  const fireOnChangeCallback = useCallback(
    (filesToNotify: (File | string)[]) => {
      if (!onChange) {
        return;
      }

      if (multi) {
        onChange(filesToNotify);
      } else {
        onChange([...filesToNotify].shift());
      }
    },
    [multi, onChange]
  );

  const addFile = useCallback(
    (filesToAdd: File[]) => {
      if (!ref.current) {
        return;
      }

      const allFiles = [...files, ...filesToAdd.filter((file) => !fileExists(files, file))];
      const dataTransfer = new DataTransfer();
      allFiles
        .filter((file): file is File => !(file instanceof File))
        .forEach((file) => {
          dataTransfer.items.add(file);
        });

      ref.current.files = dataTransfer.files;
      setFiles(allFiles);
      fireOnChangeCallback(allFiles);
    },
    [files, fireOnChangeCallback, ref]
  );

  const removeFile = useCallback(
    (fileToRemove: File | string) => {
      const newFiles = files.filter((currentFile) => !isFileEqual(currentFile, fileToRemove));
      setFiles(newFiles);
      fireOnChangeCallback(newFiles);
    },
    [files, fireOnChangeCallback]
  );

  return useMemo(
    () => ({
      files,
      removeFile,
      addFile,
    }),
    [addFile, files, removeFile]
  );
};

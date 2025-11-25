import { createContext, FC, PropsWithChildren, useContext } from 'react';

type TSize = `${number}${'Bytes' | 'KB' | 'MB' | 'GB' | 'TB'}`;

interface IUploadAoiContextProps {
  maxSize: TSize | undefined;
  acceptedFormats: string[];
}

export const UploadAoiContext = createContext<IUploadAoiContextProps>({
  maxSize: undefined,
  acceptedFormats: ['.geojson', '.json'],
});

export const useUploadAoi = () => {
  return useContext(UploadAoiContext);
};

export const UploadAoiProvider: FC<PropsWithChildren & { maxSize?: TSize }> = ({ maxSize, children }) => {
  return (
    <UploadAoiContext.Provider
      value={{
        maxSize,
        acceptedFormats: ['.geojson', '.json'],
      }}
    >
      {children}
    </UploadAoiContext.Provider>
  );
};

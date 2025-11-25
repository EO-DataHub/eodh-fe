import { Button, LoadingSpinner } from '@ukri/shared/design-system';
import { UploadFile } from '@ukri/shared/ui/upload-file';
import { FC, useEffect } from 'react';

import { InfoBox } from './info-box.component';
import { Modal } from './modal.component';
import { UploadAoiProvider } from './upload-aoi.provider';
import { useUploadAoiModal } from './use-upload-aoi-modal.hook';

interface IUploadAoiModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export const UploadAoiModal: FC<IUploadAoiModalProps> = ({ open, onClose }) => {
  const { isUploading, file, error, upload, cancel, setFile } = useUploadAoiModal({ onClose });

  useEffect(() => {
    if (!open) {
      setFile(undefined);
    }
  }, [open, setFile]);

  if (!open) {
    return null;
  }

  return (
    <Modal
      header='MAP.UPLOAD_AOI.TITLE'
      content='MAP.UPLOAD_AOI.INFO_MESSAGE'
      onClose={onClose}
      ctaButtons={
        <>
          <Button
            text='MAP.UPLOAD_AOI.BUTTON.CANCEL'
            appearance='outlined'
            size='large'
            disabled={isUploading}
            onClick={cancel}
          />
          {!isUploading && (
            <Button
              text='MAP.UPLOAD_AOI.BUTTON.CONFIRM'
              size='large'
              disabled={!file || isUploading}
              onClick={upload}
            />
          )}
          {isUploading && <Button text={<LoadingSpinner size='xs' />} size='small' disabled={true} />}
        </>
      }
    >
      <UploadAoiProvider maxSize='10MB'>
        <UploadFile
          name='geojson-upload'
          multi={false}
          value={file}
          onChange={setFile}
          accept={{
            'application/geo+json': ['.geojson'],
            'application/json': ['.json'],
          }}
          maxSize='10MB'
          slots={{ InfoBoxCmp: InfoBox }}
          error={!!error}
          helperText={error}
          disabled={isUploading}
        />
      </UploadAoiProvider>
    </Modal>
  );
};

import { Icon } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { SquareButton } from '../../../components/square-button/square-button.component';
import { UploadAoiModal } from './upload-aoi-modal.component';

interface IUploadButtonProps {
  readonly disabled?: boolean;
}

export const UploadButton = ({ disabled }: IUploadButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <SquareButton selected={modalOpen} disabled={disabled} onClick={handleClick}>
        <Icon name='Upload' width={24} height={24} />
      </SquareButton>

      <UploadAoiModal open={modalOpen} onClose={handleClose} />
    </>
  );
};

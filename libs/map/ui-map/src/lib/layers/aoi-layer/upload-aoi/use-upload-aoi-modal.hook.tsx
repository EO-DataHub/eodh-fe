import { parseGeoJSONFile, transformAreaValueCoordinates, useAoi } from '@ukri/map/data-access-map';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IUploadAoiModalProps {
  readonly onClose: () => void;
}

export const useUploadAoiModal = ({ onClose }: IUploadAoiModalProps) => {
  const { t } = useTranslation();
  const { setShape } = useAoi();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  const changeFile = useCallback((newFile: File | string | undefined) => {
    setFile(newFile instanceof File ? newFile : undefined);

    setError(undefined);
  }, []);

  const upload = useCallback(async () => {
    if (!file) {
      setError(t('MAP.UPLOAD_AOI.ERROR.NO_FILE'));
      return;
    }

    setIsUploading(true);
    setError(undefined);

    try {
      const result = await parseGeoJSONFile(file);

      if (!result.success || !result.areaValue || !result.detectedCRS) {
        setError(result.error || t('MAP.UPLOAD_AOI.ERROR.PARSE_FAILED'));
        setIsUploading(false);
        return;
      }

      const transformedAreaValue = transformAreaValueCoordinates(result.areaValue, result.detectedCRS);
      setShape(transformedAreaValue, true);

      setFile(undefined);
      setError(undefined);
      onClose();
    } catch (err) {
      setError(t('MAP.UPLOAD_AOI.ERROR.UPLOAD_FAILED'));
    } finally {
      setIsUploading(false);
    }
  }, [file, setShape, onClose, t]);

  const cancel = useCallback(() => {
    setFile(undefined);
    setError(undefined);
    onClose();
  }, [onClose]);

  return useMemo(
    () => ({
      isUploading,
      file,
      error,
      cancel,
      upload,
      setFile: changeFile,
    }),
    [isUploading, file, error, cancel, upload, changeFile]
  );
};

import { Icon } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { useUploadAoi } from './upload-aoi.provider';

export const InfoBox = () => {
  const { t } = useTranslation();
  const { maxSize } = useUploadAoi();

  return (
    <div className='w-full text-center flex flex-col items-center gap-4'>
      <Icon name='Upload' className='text-primary w-6 h-6' />
      <p className='text-base text-text-primary'>{t('MAP.UPLOAD_AOI.INFO_BOX.DESCRIPTION')}</p>
      <p className='text-sm text-text-light'>{t('MAP.UPLOAD_AOI.INFO_BOX.SUPPORTED_MESSAGE')}</p>
      {maxSize && <p className='text-sm text-text-light'>{t('MAP.UPLOAD_AOI.INFO_BOX.MAX_SIZE', { size: maxSize })}</p>}
    </div>
  );
};

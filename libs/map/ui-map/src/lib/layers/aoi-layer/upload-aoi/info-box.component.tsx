import { Button } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { useUploadAoi } from './upload-aoi.provider';

export const InfoBox = () => {
  const { t } = useTranslation();
  const { maxSize } = useUploadAoi();

  return (
    <div className='w-full text-center flex flex-col items-center gap-4'>
      <p className='text-base text-text-primary'>{t('MAP.UPLOAD_AOI.INFO_BOX.DESCRIPTION')}</p>
      <p className='text-sm text-text-light'>{t('MAP.UPLOAD_AOI.INFO_BOX.SUPPORTED_MESSAGE')}</p>
      <Button
        size='large'
        appearance='outlined'
        type='link'
        text={t('MAP.UPLOAD_AOI.INFO_BOX.BROWSE_COMPUTER_BUTTON')}
        className='hover:!outline-[0px] focus:!outline-[0px] hover:!border-primary'
      />
      {maxSize && <p className='text-sm text-text-light'>{t('MAP.UPLOAD_AOI.INFO_BOX.MAX_SIZE', { size: maxSize })}</p>}
    </div>
  );
};

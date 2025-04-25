import { Button, Icon, LoadingSpinner, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import { presetStyles } from './preset.styles';

type TImageStatus = 'loading' | 'error' | 'loaded';

interface IImageProps {
  imageUrl: string | undefined;
}

const Image = ({ imageUrl }: IImageProps) => {
  const [status, setStatus] = useState<TImageStatus>('loading');
  const isLoading = useMemo(() => status === 'loading' || !imageUrl?.length, [status, imageUrl]);
  const loaded = useMemo(() => status === 'loaded', [status]);

  const showError = useCallback(() => {
    setStatus('error');
  }, []);

  const showImage = useCallback(() => {
    setStatus('loaded');
  }, []);

  if (!imageUrl || status === 'error') {
    return (
      <div className={presetStyles.errorContainer}>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <div className={presetStyles.imageContainer}>
      {isLoading && <LoadingSpinner />}
      <img src={imageUrl} alt='Preset' className={presetStyles.image(loaded)} onError={showError} onLoad={showImage} />
    </div>
  );
};

export interface IResultItemProps {
  imageUrl: string | undefined;
  title: string;
  description?: string;
  disabled?: boolean;
  onLoadPresetClick: () => void;
  className?: string;
}

export const Preset = ({
  imageUrl,
  title,
  description,
  disabled = false,
  onLoadPresetClick,
  className,
}: IResultItemProps) => {
  return (
    <div className={clsx(presetStyles.presetContainer, className)}>
      <Image imageUrl={imageUrl} />
      <div className={presetStyles.contentContainer}>
        <div className='flex-grow'>
          <Text content={title} fontSize='large' fontWeight='regular' className={presetStyles.title} />
          {description && <Text content={description} fontSize='medium' fontWeight='regular' />}
        </div>
        <div className={presetStyles.buttonContainer}>
          <Button
            text={'MAP.ACTION_CREATOR_PANEL.PRESETS.BUTTON'}
            size='medium'
            onClick={onLoadPresetClick}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

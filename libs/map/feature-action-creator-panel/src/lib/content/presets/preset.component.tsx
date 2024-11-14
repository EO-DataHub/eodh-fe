import { Button, Icon, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

import { presetStyles } from './preset.styles';

interface IImageProps {
  imageUrl: string | undefined;
}

const Image = ({ imageUrl }: IImageProps) => {
  const [displayError, setDislayError] = useState(false);

  const showError = useCallback(() => {
    setDislayError(true);
  }, []);

  if (!imageUrl || displayError) {
    return (
      <div className={presetStyles.errorContainer}>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <div className={presetStyles.imageContainer}>
      <img src={imageUrl} alt='Preset' className={presetStyles.image} onError={showError} />
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

export const Preset = ({ imageUrl, title, description, disabled, onLoadPresetClick, className }: IResultItemProps) => {
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

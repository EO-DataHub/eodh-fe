import { Button, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { presetStyles } from './preset.styles';

interface IImageProps {
  imageUrl: string;
}

const Image = ({ imageUrl }: IImageProps) => {
  const [displayError, setDislayError] = useState(false);

  const showError = useCallback(() => {
    setDislayError(true);
  }, []);

  if (displayError) {
    return (
      <div className={presetStyles.errorContainer}>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <div className={presetStyles.imageContainer}>
      <img src={imageUrl} alt='ResultItem' className={presetStyles.image} onError={showError} />
    </div>
  );
};

export interface IResultItemProps {
  imageUrl: string;
  title: string;
  description: string;
  onLoadPresetClick: () => void;
}

export const Preset = ({ imageUrl, title, description, onLoadPresetClick }: IResultItemProps) => {
  return (
    <div className={presetStyles.presetContainer}>
      <Image imageUrl={imageUrl} />
      <div className={presetStyles.contentContainer}>
        <div className='flex-grow'>
          <Text content={title} fontSize='large' fontWeight='regular' className={presetStyles.title} />
          <Text content={description} fontSize='medium' fontWeight='regular' />
        </div>
        <div className={presetStyles.buttonContainer}>
          <Button text={'MAP.ACTION_CREATOR_PANEL.PRESETS.BUTTON'} size='medium' onClick={onLoadPresetClick} />
        </div>
      </div>
    </div>
  );
};

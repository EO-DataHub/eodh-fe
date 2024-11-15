import { Button, Icon, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { presetStyles } from './preset.styles';

const ComingSoonNote = () => {
  const { t } = useTranslation();

  return (
    <Text
      content={t('MAP.ACTION_CREATOR_PANEL.PRESETS.COMING_SOON')}
      fontSize='large'
      fontWeight='semibold'
      className='inline uppercase text-primary-main'
    />
  );
};

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

export const Preset = ({
  imageUrl,
  title,
  description,
  disabled = false,
  onLoadPresetClick,
  className,
}: IResultItemProps) => {
  const presetTitle = useMemo(() => {
    if (disabled) {
      return (
        <span>
          <ComingSoonNote /> {title}
        </span>
      );
    }
    return title;
  }, [title, disabled]);

  return (
    <div className={clsx(presetStyles.presetContainer, className)}>
      <Image imageUrl={imageUrl} />
      <div className={presetStyles.contentContainer}>
        <div className='flex-grow'>
          <Text content={presetTitle} fontSize='large' fontWeight='regular' className={presetStyles.title} />
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

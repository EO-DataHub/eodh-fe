import { useMode } from '@ukri/map/data-access-map';
import { fetchImage } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { useCallback, useEffect, useState } from 'react';

interface IImageProps {
  imageUrl: string;
  onToggle?: () => void;
  disabled?: boolean;
}

export const Image = ({ imageUrl, onToggle, disabled = false }: IImageProps) => {
  const { mode } = useMode();
  const [displayError, setDislayError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  const getAssetImage = useCallback(
    async (imageUrl: string): Promise<Blob | string> => {
      if (mode === 'action-creator') {
        const response = await fetchImage(imageUrl);
        return response;
      } else if (mode === 'search') {
        return imageUrl;
      }
      return '';
    },
    [mode]
  );

  const showError = useCallback(() => {
    setDislayError(true);
  }, []);

  const onImageClick = useCallback(() => {
    if (onToggle && !disabled) {
      onToggle();
    }
  }, [onToggle, disabled]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await getAssetImage(imageUrl);
        if (typeof image === 'string') {
          setImageSrc(image);
        } else {
          setImageSrc(imageUrl);
        }
      } catch (error) {
        showError();
      }
    };

    fetchImage();
  }, [imageUrl, getAssetImage, showError]);

  if (displayError) {
    return (
      <div className='flex justify-center items-center w-[132px] min-w-[132px] min-h-[132px] h-[132px] bg-bright-dark'>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt='ResultItem'
      className={`w-[132px] h-[132px] min-w-[132px] min-h-[132px] object-cover rounded-md ${
        disabled ? '' : 'cursor-pointer'
      }`}
      onClick={onImageClick}
      onError={showError}
    />
  );
};

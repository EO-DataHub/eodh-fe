import { useMode } from '@ukri/map/data-access-map';
import { fetchImage } from '@ukri/map/data-access-map';
import { Icon, LoadingSpinner } from '@ukri/shared/design-system';
import { useCallback, useEffect, useMemo, useState } from 'react';

const imageStyles = {
  container: 'w-[132px] h-[132px] min-w-[132px] min-h-[132px]',
  base: (loaded: boolean) => (loaded ? 'object-cover rounded-md' : 'invisible'),
  disabled: ({ disabled, loaded }: { disabled: boolean; loaded: boolean }) =>
    !loaded ? '' : disabled ? '' : 'cursor-pointer',
  width: (loaded: boolean) => (loaded ? 'w-[132px] h-[132px] min-w-[132px] min-h-[132px]' : 'w-0 h-0'),
};

type TImageStatus = 'loading' | 'error' | 'loaded';

interface IImageProps {
  imageUrl: string | null | undefined;
  onToggle?: () => void;
  disabled?: boolean;
}

export const Image = ({ imageUrl, onToggle, disabled = false }: IImageProps) => {
  const { mode } = useMode();
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<TImageStatus>('loading');
  const isLoading = useMemo(() => status === 'loading' || !imageSrc, [status, imageSrc]);
  const loaded = useMemo(() => status === 'loaded', [status]);

  const getAssetImage = useCallback(
    async (imageUrl: string): Promise<Blob | string> => {
      if (mode === 'action-creator') {
        return await fetchImage(imageUrl);
      } else if (mode === 'search') {
        return imageUrl;
      }
      return '';
    },
    [mode]
  );

  const showError = useCallback(() => {
    setStatus('error');
  }, []);

  const showImage = useCallback(() => {
    setStatus('loaded');
  }, []);

  const onImageClick = useCallback(() => {
    if (onToggle && !disabled) {
      onToggle();
    }
  }, [onToggle, disabled]);

  useEffect(() => {
    const fetchImage = async (url: string) => {
      try {
        const image = await getAssetImage(url);
        if (typeof image === 'string') {
          setImageSrc(image);
        } else {
          setImageSrc(url);
        }
      } catch (error) {
        showError();
      }
    };

    if (!imageUrl || !imageUrl.length) {
      showError();
      return;
    }

    fetchImage(imageUrl);
  }, [imageUrl, getAssetImage, showError]);

  if (status === 'error') {
    return (
      <div className={`${imageStyles.container} flex justify-center items-center bg-bright-dark`}>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <div className={`${imageStyles.container} flex items-center justify-center`}>
      {isLoading && <LoadingSpinner />}
      <img
        src={imageSrc}
        alt='ResultItem'
        className={`${imageStyles.base(loaded)} ${imageStyles.width(loaded)} ${imageStyles.disabled({
          loaded,
          disabled,
        })}`}
        onClick={onImageClick}
        onError={showError}
        onLoad={showImage}
      />
    </div>
  );
};

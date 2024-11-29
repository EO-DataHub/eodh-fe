import { useMode } from '@ukri/map/data-access-map';
import { fetchImage } from '@ukri/map/data-access-map';
import { useComparisonMode } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { Button, Icon, Text, TIconNames } from '@ukri/shared/design-system';
import { formatDate, formatHourInUtc, type TDateTimeString } from '@ukri/shared/utils/date';
import isNumber from 'lodash/isNumber';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface IResultItemInfoProps {
  value: string;
  iconName: TIconNames;
}

const ResultItemInfo = ({ value, iconName }: IResultItemInfoProps) => {
  return (
    <span className='flex items-start'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={value} translate={false} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

interface IImageProps {
  imageUrl: string;
  onToggle?: () => void;
}

const Image = ({ imageUrl, onToggle }: IImageProps) => {
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
      className='w-[132px] h-[132px] min-w-[132px] min-h-[132px] object-cover rounded-md cursor-pointer'
      onClick={onToggle}
      onError={showError}
    />
  );
};

export interface IResultItemProps {
  imageUrl: string;
  collectionName: string;
  dateTime: string;
  cloudCoverage?: number;
  gridCode?: string;
  onToggleSelectedItem?: () => void;
  selected?: boolean;
  className?: string;
  item: TFeature;
  onDownload?: () => void;
}

export const ResultItem = ({
  imageUrl,
  collectionName,
  dateTime,
  cloudCoverage,
  gridCode,
  selected,
  onToggleSelectedItem,
  className,
  item,
  onDownload,
}: IResultItemProps) => {
  const {
    comparisonModeEnabled,
    addComparisonItem,
    removeComparisonItem,
    itemAddedToComparisonMode,
    canAddAsNewItemToComparisonMode,
  } = useComparisonMode();
  const isAddedForComparison = itemAddedToComparisonMode(item);
  const addToComparisonDisabled = canAddAsNewItemToComparisonMode(item);
  const { mode } = useMode();

  const time = useMemo(() => `${formatHourInUtc(dateTime as TDateTimeString)} UTC`, [dateTime]);
  const date = useMemo(() => formatDate(dateTime as TDateTimeString, 'YYYY-MM-DD'), [dateTime]);

  const handleCompareClick = useCallback(() => {
    if (isAddedForComparison) {
      removeComparisonItem(item);
    } else {
      addComparisonItem(item, mode);
    }
  }, [addComparisonItem, removeComparisonItem, isAddedForComparison, item, mode]);

  const cloudCoverageValue = useMemo(() => {
    return isNumber(cloudCoverage) ? `${cloudCoverage.toFixed(2)}%` : cloudCoverage;
  }, [cloudCoverage]);

  return (
    <div
      className={`flex flex-col bg-bright-light p-[13px] rounded-md max-w-96 border-[3px] ${
        selected ? ' border-primary' : 'border-transparent'
      } ${className}`}
    >
      <div className='w-full flex mb-2'>
        <Image imageUrl={imageUrl} onToggle={onToggleSelectedItem} />
        <div className='flex flex-col ml-2.5 text-text justify-between'>
          <ResultItemInfo value={collectionName} iconName='Satellite' />
          <ResultItemInfo value={date ?? ''} iconName='Calendar' />
          <ResultItemInfo value={time ?? ''} iconName='Schedule' />
          {cloudCoverageValue && <ResultItemInfo value={cloudCoverageValue} iconName='Cloud' />}
          {gridCode && <ResultItemInfo value={gridCode} iconName='Map' />}
        </div>
      </div>

      <div className='flex justify-end'>
        <Button
          appearance='text'
          text='GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON.DOWNLOAD'
          size='medium'
          className='mr-8'
          onClick={onDownload}
        />
        <Button
          appearance='text'
          text={
            isAddedForComparison
              ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
              : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE'
          }
          size='medium'
          onClick={handleCompareClick}
          className={`pl-0 ${isAddedForComparison ? '!text-error' : ''}`}
          disabled={addToComparisonDisabled}
        />
        <Button
          text={
            selected ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE' : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
          }
          size='small'
          onClick={onToggleSelectedItem}
          disabled={comparisonModeEnabled}
        />
      </div>
    </div>
  );
};

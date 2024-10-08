import isNumber from 'lodash/isNumber';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

interface IResultItemInfoProps {
  value: string;
  iconName: TIconNames;
}

const ResultItemInfo = ({ value, iconName }: IResultItemInfoProps) => {
  return (
    <span className='flex mb-1'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={value} translate={false} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

// TODO: to be removed in the future, once we will work on comparison functionality
const hideCompareButton = 'opacity-0 pointer-events-none';

interface IImageProps {
  imageUrl: string;
  onToggle?: () => void;
}

const Image = ({ imageUrl, onToggle }: IImageProps) => {
  const [displayError, setDislayError] = useState(false);

  const showError = useCallback(() => {
    setDislayError(true);
  }, []);

  if (displayError) {
    return (
      <div className='flex justify-center items-center w-[132px] min-w-[132px] min-h-[132px] h-[132px] bg-bright-dark'>
        <Icon name='HideImage' />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt='ResultItem'
      className='w-[132px] h-[132px] object-cover rounded-md cursor-pointer'
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
  id: string | number;
  // TODO rethink logic and type definition for comparison functionality
  addedForComparison?: boolean;
  onAddToCompare?: () => void;
  onRemoveFromCompare?: () => void;
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
  addedForComparison,
  onAddToCompare,
  onRemoveFromCompare,
}: IResultItemProps) => {
  const [isAddedForComparison, setIsAddedForComparison] = useState(addedForComparison);
  const time = useMemo(() => `${new Date(dateTime).getHours()}:${new Date(dateTime).getMinutes()}`, [dateTime]);
  const date = useMemo(() => new Date(dateTime).toISOString().split('T')[0], [dateTime]);

  const handleCompareClick = useCallback(() => {
    if (!isAddedForComparison && onAddToCompare) {
      setIsAddedForComparison(true);
      onAddToCompare();
    } else if (isAddedForComparison && onRemoveFromCompare) {
      setIsAddedForComparison(false);
      onRemoveFromCompare();
    }
  }, [onAddToCompare, isAddedForComparison, onRemoveFromCompare]);

  const cloudCoverageValue = useMemo(() => {
    return isNumber(cloudCoverage) ? `${cloudCoverage.toFixed(2)}%` : cloudCoverage;
  }, [cloudCoverage]);

  return (
    <div
      className={`flex bg-bright-light p-4 rounded-md max-w-96 border-[3px] ${
        selected ? ' border-primary' : 'border-transparent'
      } ${className}`}
    >
      <Image imageUrl={imageUrl} onToggle={onToggleSelectedItem} />
      <div className='ml-2.5 text-text w-full flex flex-col h-auto'>
        <div className='flex-grow'>
          <ResultItemInfo value={collectionName} iconName='Satellite' />
          <ResultItemInfo value={date} iconName='Calendar' />
          <ResultItemInfo value={time} iconName='Schedule' />
          {cloudCoverageValue && <ResultItemInfo value={cloudCoverageValue} iconName='Cloud' />}
          {gridCode && <ResultItemInfo value={gridCode} iconName='Map' />}
        </div>
        <div className='flex justify-between mt-auto'>
          <Button
            appearance='text'
            text={
              isAddedForComparison
                ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
                : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE'
            }
            size='medium'
            onClick={handleCompareClick}
            className={`${hideCompareButton} ${isAddedForComparison ? '!text-error' : ''}`}
          />
          <Button
            text={
              selected ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE' : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
            }
            size='small'
            onClick={onToggleSelectedItem}
          />
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';

import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

interface IThumbnailInfoProps {
  name: string;
  iconName: TIconNames;
}

const ThumbnailInfo = ({ name, iconName }: IThumbnailInfoProps) => {
  return (
    <span className='flex mb-1'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={name} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

interface IThumbnailProps {
  imageUrl: string;
  collectionName: string;
  date: string;
  time: string;
  cloudCoverage?: string;
  gridCode?: string;
  onSelected?: () => void;
  selected?: boolean;
  addedForComparison?: boolean;
  onAddToCompare?: () => void;
  onRemoveFromCompare?: () => void;
}

export const Thumbnail = ({
  imageUrl,
  collectionName,
  date,
  time,
  cloudCoverage,
  gridCode,
  selected,
  onSelected,
  addedForComparison,
  onAddToCompare,
  onRemoveFromCompare,
}: IThumbnailProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelectItem = () => {
    setIsSelected(!isSelected);
    if (onSelected) {
      onSelected();
    }
  };

  return (
    <div
      className={`flex bg-bright-light p-4 rounded-md max-w-96 border-[3px] ${
        selected ? ' border-primary' : 'border-transparent'
      }`}
    >
      <img
        src={imageUrl}
        alt='Thumbnail'
        className='w-[132px] h-[132px] object-cover rounded-md cursor-pointer'
        onClick={handleSelectItem}
      />
      <div className='ml-2.5 text-text w-full flex flex-col h-auto'>
        <div className='flex-grow'>
          <ThumbnailInfo name={collectionName} iconName='Satellite' />
          <ThumbnailInfo name={date} iconName='Calendar' />
          <ThumbnailInfo name={time} iconName='Schedule' />
          {cloudCoverage && <ThumbnailInfo name={cloudCoverage} iconName='Cloud' />}
          {gridCode && <ThumbnailInfo name={gridCode} iconName='Map' />}
        </div>
        <div className='flex justify-between mt-auto'>
          {addedForComparison ? (
            <Button
              appearance='text'
              text='GLOBAL.DESIGN_SYSTEM.THUMBNAIL.REMOVE_COMPARE'
              size='medium'
              onClick={onRemoveFromCompare}
              className='!text-error'
            />
          ) : (
            <Button
              appearance='text'
              text='GLOBAL.DESIGN_SYSTEM.THUMBNAIL.ADD_TO_COMPARE'
              size='medium'
              onClick={onAddToCompare}
            />
          )}
          <Button text='GLOBAL.DESIGN_SYSTEM.THUMBNAIL.BUTTON' size='small' onClick={handleSelectItem} />
        </div>
      </div>
    </div>
  );
};

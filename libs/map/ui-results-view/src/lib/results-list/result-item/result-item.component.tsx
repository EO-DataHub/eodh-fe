import { formatDate, formatHourInUtc, type TDateTimeString } from '@ukri/shared/utils/date';
import isNumber from 'lodash/isNumber';
import { PropsWithChildren, useMemo } from 'react';

import { Image } from './image.component';
import { ResultItemInfo } from './result-info.component';

export interface IResultItemProps {
  className?: string;
  imageUrl: string;
  gridCode?: string;
  cloudCoverage?: number;
  collectionName: string;
  dateTime: string;
  selected?: boolean;
  onToggleSelectedItem?: () => void;
  onImageHover?: () => void;
  onImageLeftHover?: () => void;
}

export const ResultItem = ({
  className = '',
  imageUrl,
  gridCode,
  cloudCoverage,
  selected,
  collectionName,
  dateTime,
  children,
  onToggleSelectedItem,
  onImageHover,
  onImageLeftHover,
}: PropsWithChildren<IResultItemProps>) => {
  const time = useMemo(() => `${formatHourInUtc(dateTime as TDateTimeString)} UTC`, [dateTime]);
  const date = useMemo(() => formatDate(dateTime as TDateTimeString, 'YYYY-MM-DD'), [dateTime]);
  const cloudCoverageValue = useMemo(
    () => (isNumber(cloudCoverage) ? `${cloudCoverage.toFixed(2)}%` : cloudCoverage),
    [cloudCoverage]
  );

  return (
    <div
      className={`flex flex-col bg-bright-light p-[13px] rounded-md max-w-96 border-[3px] ${
        selected ? ' border-primary' : 'border-transparent'
      } ${className}`}
    >
      <div className='w-full flex mb-2' onMouseEnter={onImageHover} onMouseLeave={onImageLeftHover}>
        <Image imageUrl={imageUrl} onToggle={onToggleSelectedItem} />
        <div className='flex flex-col ml-2.5 text-text justify-start gap-1'>
          <ResultItemInfo value={collectionName} iconName='Satellite' />
          <ResultItemInfo value={date ?? ''} iconName='Calendar' />
          <ResultItemInfo value={time ?? ''} iconName='Schedule' />
          {cloudCoverageValue && <ResultItemInfo value={cloudCoverageValue} iconName='Cloud' />}
          {gridCode && <ResultItemInfo value={gridCode} iconName='Map' />}
        </div>
      </div>

      {children}
    </div>
  );
};

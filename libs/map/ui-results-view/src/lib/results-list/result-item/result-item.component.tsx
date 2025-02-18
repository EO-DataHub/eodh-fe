import { IHighlightedItem } from '@ukri/map/data-access-map';
import { formatDate, formatHourInUtc, type TDateTimeString } from '@ukri/shared/utils/date';
import isNumber from 'lodash/isNumber';
import { PropsWithChildren, useEffect, useMemo, useRef } from 'react';

import { Image } from './image.component';
import { ResultItemInfo } from './result-info.component';

export interface IResultItemProps {
  className?: string;
  imageUrl: string;
  id: string;
  highlightedItem: IHighlightedItem | undefined;
  gridCode?: string;
  cloudCoverage?: number;
  collectionName: string;
  dateTime: string;
  selected?: boolean;
  onToggleSelectedItem?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  hasManyIndices?: boolean;
}

export const ResultItem = ({
  className = '',
  imageUrl,
  id,
  highlightedItem,
  gridCode,
  cloudCoverage,
  selected,
  collectionName,
  dateTime,
  children,
  hasManyIndices,
  onToggleSelectedItem,
  onMouseEnter,
  onMouseLeave,
}: PropsWithChildren<IResultItemProps>) => {
  const time = useMemo(() => `${formatHourInUtc(dateTime as TDateTimeString)} UTC`, [dateTime]);
  const date = useMemo(() => formatDate(dateTime as TDateTimeString, 'YYYY-MM-DD'), [dateTime]);
  const cloudCoverageValue = useMemo(
    () => (isNumber(cloudCoverage) ? `${cloudCoverage.toFixed(2)}%` : cloudCoverage),
    [cloudCoverage]
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (highlightedItem && id === highlightedItem.featureId && highlightedItem.eventSource === 'map') {
      ref.current?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [highlightedItem, id]);

  return (
    <div
      ref={ref}
      className={`flex flex-col bg-bright-light p-[13px] rounded-md max-w-96 border-[3px] ${
        selected ? ' border-primary' : 'border-transparent'
      } ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='w-full flex mb-2'>
        <Image imageUrl={imageUrl} disabled={hasManyIndices} onToggle={onToggleSelectedItem} />
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

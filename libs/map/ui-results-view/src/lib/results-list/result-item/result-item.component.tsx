import { Button } from '@ukri/shared/design-system';
import { formatDate, formatHourInUtc, type TDateTimeString } from '@ukri/shared/utils/date';
import isNumber from 'lodash/isNumber';
import { useMemo } from 'react';

import { Image } from './image.component';
import { ResultItemInfo } from './result-info.component';

export interface IResultItemProps {
  className?: string;
  gridCode?: string;
  selected?: boolean;
  imageUrl: string;
  collectionName: string;
  dateTime: string;
  cloudCoverage?: number;
  addedForComparison: boolean;
  canCompare: boolean;
  comparisonEnabled: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem?: () => void;
}

export const ResultItem = ({
  className = '',
  imageUrl,
  collectionName,
  dateTime,
  cloudCoverage,
  gridCode,
  selected,
  addedForComparison,
  onToggleSelectedItem,
  onDownload,
  canCompare,
  onCompareItemToggle,
  comparisonEnabled,
}: IResultItemProps) => {
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
            addedForComparison
              ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
              : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE'
          }
          size='medium'
          onClick={onCompareItemToggle}
          className={`pl-0 ${addedForComparison ? '!text-error' : ''}`}
          disabled={canCompare}
        />
        <Button
          text={
            selected ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE' : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
          }
          size='small'
          onClick={onToggleSelectedItem}
          disabled={comparisonEnabled}
        />
      </div>
    </div>
  );
};

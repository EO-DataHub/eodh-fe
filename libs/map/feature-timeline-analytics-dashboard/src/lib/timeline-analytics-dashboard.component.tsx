import { useCollectionInfo } from '@ukri/map/data-access-map';
import { useDate, useMode, useResults } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';
import { useCallback, useMemo } from 'react';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className = '' }: TActionCreatorPanelProps) => {
  const { mode } = useMode();
  const { searchParams, updateSearchParams } = useResults();
  const { date } = useDate();

  const { data } = useCollectionInfo({
    args:
      mode === 'action-creator'
        ? { jobId: searchParams?.jobId, userWorkspace: searchParams?.userWorkspace }
        : undefined,
  });

  const updateSearchResultsParams = useCallback(
    (dateFrom: Date, dateTo: Date) => {
      updateSearchParams({
        date: { from: createDateString(dateFrom) ?? undefined, to: createDateString(dateTo) ?? undefined },
        jobId: searchParams?.jobId || '',
        userWorkspace: searchParams?.userWorkspace || '',
      });
    },
    [searchParams, updateSearchParams]
  );

  const { minDate, maxDate } = useMemo(() => {
    if (mode === 'search') {
      return {
        minDate: createDateString(date.from),
        maxDate: createDateString(date.to),
      };
    }
    return {
      minDate: createDateString(data?.collectionInterval?.from ?? undefined),
      maxDate: createDateString(data?.collectionInterval?.to ?? undefined),
    };
  }, [mode, date, data]);

  return <TimeSlider min={minDate} max={maxDate} className={className} onUpdate={updateSearchResultsParams} />;
};

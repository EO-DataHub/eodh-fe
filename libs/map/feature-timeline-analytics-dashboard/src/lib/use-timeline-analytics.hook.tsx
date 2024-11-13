import { useCollectionInfo, useDate, useMode, useResults } from '@ukri/map/data-access-map';
import { createDateString } from '@ukri/shared/utils/date';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';

export const useTimelineAnalytics = () => {
  const { mode } = useMode();
  const { searchParams, updateSearchParams } = useResults();
  const { date } = useDate();

  const { data } = useCollectionInfo({
    enabled: mode === 'action-creator',
    args: { jobId: searchParams?.jobId, userWorkspace: searchParams?.userWorkspace },
  });

  const updateSearchResultsParams = useMemo(() => {
    const callback: (dateFrom: Date, dateTo: Date) => void = (dateFrom, dateTo) => {
      updateSearchParams({
        date: { from: createDateString(dateFrom) ?? undefined, to: createDateString(dateTo) ?? undefined },
        jobId: searchParams?.jobId || '',
        userWorkspace: searchParams?.userWorkspace || '',
        dataSets: searchParams?.dataSets ?? undefined,
        aoi: searchParams?.aoi ?? undefined,
      });
    };

    return debounce(callback, 300);
  }, [searchParams, updateSearchParams]);

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

  return {
    minDate,
    maxDate,
    updateSearchResultsParams,
  };
};

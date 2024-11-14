import { useCollectionInfo, useDate, useMode, useResults } from '@ukri/map/data-access-map';
import { createDateString, type TDateString } from '@ukri/shared/utils/date';
import debounce from 'lodash/debounce';
import { useMemo } from 'react';

export const useTimelineAnalytics = () => {
  const { mode } = useMode();
  const { isWorkflow, isCatalogue, searchParams, updateSearchParams } = useResults();
  const { date } = useDate();

  const { data } = useCollectionInfo({
    enabled: mode === 'action-creator',
    params: { jobId: searchParams?.jobId ?? '', userWorkspace: searchParams?.userWorkspace ?? '' },
  });

  const updateSearchResultsParams = useMemo(() => {
    const callback: (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => void = (
      dateFrom,
      dateTo
    ) => {
      if (!searchParams) {
        return;
      }

      if (isCatalogue(searchParams)) {
        updateSearchParams({
          date: {
            from: dateFrom,
            to: dateTo,
          },
          dataSets: searchParams.dataSets ?? undefined,
          aoi: searchParams.aoi ?? undefined,
        });
      } else if (isWorkflow(searchParams)) {
        updateSearchParams({
          date: {
            from: dateFrom,
            to: dateTo,
          },
          jobId: searchParams.jobId || '',
          userWorkspace: searchParams.userWorkspace || '',
        });
      }
    };

    return debounce(callback, 300);
  }, [isCatalogue, isWorkflow, searchParams, updateSearchParams]);

  const { minDate, maxDate } = useMemo(() => {
    if (mode === 'search') {
      return {
        minDate: createDateString(date.from || undefined),
        maxDate: createDateString(date.to || undefined),
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

import { useResults } from '@ukri/map/data-access-map';
import { createDateString, type TDateString } from '@ukri/shared/utils/date';
import debounce from 'lodash/debounce';
import { useCallback, useMemo } from 'react';

export const useTimelineAnalytics = () => {
  const { isWorkflow, isCatalogue, searchParams, updateSearchParams } = useResults();

  const callback = useCallback(
    (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => {
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
          timeSliderBoundaries: searchParams.timeSliderBoundaries,
        });
      } else if (isWorkflow(searchParams)) {
        updateSearchParams({
          date: {
            from: dateFrom,
            to: dateTo,
          },
          jobId: searchParams.jobId || '',
          userWorkspace: searchParams.userWorkspace || '',
          timeSliderBoundaries: searchParams.timeSliderBoundaries,
        });
      }
    },
    [isCatalogue, isWorkflow, searchParams, updateSearchParams]
  );

  const updateSearchResultsParams = useMemo(() => {
    return debounce(callback, 300);
  }, [callback]);

  const { sliderMinDate, sliderMaxDate, selectedMinDate, selectedMaxDate } = useMemo(() => {
    return {
      sliderMinDate: createDateString(searchParams?.timeSliderBoundaries?.from ?? undefined),
      sliderMaxDate: createDateString(searchParams?.timeSliderBoundaries?.to ?? undefined),
      selectedMinDate: createDateString(searchParams?.date?.from ?? undefined),
      selectedMaxDate: createDateString(searchParams?.date?.to ?? undefined),
    };
  }, [searchParams]);

  return {
    sliderMinDate,
    sliderMaxDate,
    selectedMinDate,
    selectedMaxDate,
    updateSearchResultsParams,
  };
};

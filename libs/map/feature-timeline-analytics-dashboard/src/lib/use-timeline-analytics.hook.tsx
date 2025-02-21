import { useResults } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { createDateString, dateToNumber, type TDateString } from '@ukri/shared/utils/date';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';

const useDateRange = () => {
  const { searchParams } = useResults();
  const [currentSearchId, setSurrentSearchId] = useState(searchParams?.id);
  const [minDate, setMinDate] = useState(createDateString(searchParams?.timeSliderBoundaries?.from));
  const [maxDate, setMaxDate] = useState(createDateString(searchParams?.timeSliderBoundaries?.to));
  const [selectedMinDate, setSelectedMinDate] = useState(createDateString(searchParams?.date?.from));
  const [selectedMaxDate, setSelectedMaxDate] = useState(createDateString(searchParams?.date?.to));

  const updateSelectedDate = useCallback((dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => {
    setSelectedMinDate(dateFrom);
    setSelectedMaxDate(dateTo);
  }, []);

  useEffect(() => {
    const newMinDate = createDateString(searchParams?.timeSliderBoundaries?.from);
    const newMaxDate = createDateString(searchParams?.timeSliderBoundaries?.to);
    const newSelectedMinDate = createDateString(searchParams?.date?.from);
    const newSelectedMaxDate = createDateString(searchParams?.date?.to);

    if (currentSearchId !== searchParams?.id) {
      setMinDate(newMinDate);
      setMaxDate(newMaxDate);
      setSelectedMinDate(newSelectedMinDate);
      setSelectedMaxDate(newSelectedMaxDate);
      setSurrentSearchId(searchParams?.id);
    }
  }, [
    currentSearchId,
    searchParams?.date?.from,
    searchParams?.date?.to,
    searchParams?.id,
    searchParams?.timeSliderBoundaries?.from,
    searchParams?.timeSliderBoundaries?.to,
  ]);

  return useMemo(
    () => ({
      minDate,
      maxDate,
      selectedMinDate,
      selectedMaxDate,
      updateSelectedDate,
    }),
    [maxDate, minDate, selectedMinDate, selectedMaxDate, updateSelectedDate]
  );
};

export const useTimelineAnalytics = () => {
  const { isWorkflow, isCatalogue, searchParams, updateSearchParams } = useResults();
  const { status } = useCatalogSearch({ params: searchParams });
  const {
    minDate,
    maxDate,
    selectedMinDate,
    selectedMaxDate,
    updateSelectedDate: updateCurrentSelectedDate,
  } = useDateRange();

  const updateSearchResultsParams = useCallback(
    (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => {
      if (!searchParams) {
        return;
      }
      const newDateFromAsNumber = dateToNumber(dateFrom, 'firstDay');
      const newDateToAsNumber = dateToNumber(dateTo, 'lastDay');
      const currentDateFromAsNumber = searchParams.date?.from ? dateToNumber(searchParams.date.from, 'firstDay') : 0;
      const currentDateToAsNumber = searchParams.date?.to ? dateToNumber(searchParams.date.to, 'lastDay') : 0;
      const newDateFrom =
        newDateFromAsNumber === currentDateFromAsNumber && searchParams.date?.from ? searchParams.date.from : dateFrom;
      const newDateTo =
        newDateToAsNumber === currentDateToAsNumber && searchParams.date?.to ? searchParams.date.to : dateTo;

      if (newDateFromAsNumber === currentDateFromAsNumber && newDateToAsNumber === currentDateToAsNumber) {
        return;
      }

      if (isCatalogue(searchParams)) {
        updateSearchParams({
          id: searchParams.id,
          date: {
            from: newDateFrom,
            to: newDateTo,
          },
          dataSets: searchParams.dataSets ?? undefined,
          aoi: searchParams.aoi ?? undefined,
          timeSliderBoundaries: searchParams.timeSliderBoundaries,
        });
      } else if (isWorkflow(searchParams)) {
        updateSearchParams({
          id: searchParams.id,
          date: {
            from: newDateFrom,
            to: newDateTo,
          },
          jobId: searchParams.jobId || '',
          workflowId: searchParams.workflowId || '',
          userWorkspace: searchParams.userWorkspace || '',
          timeSliderBoundaries: searchParams.timeSliderBoundaries,
        });
      }
    },
    [isCatalogue, isWorkflow, searchParams, updateSearchParams]
  );

  const updateSearchResultsParamsWithDebounce = useMemo(() => {
    return debounce(updateSearchResultsParams, 300);
  }, [updateSearchResultsParams]);

  const updateSelectedDate = useCallback(
    (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => {
      updateCurrentSelectedDate(dateFrom, dateTo);
      updateSearchResultsParamsWithDebounce(dateFrom, dateTo);
    },
    [updateSearchResultsParamsWithDebounce, updateCurrentSelectedDate]
  );

  return {
    minDate,
    maxDate,
    selectedMinDate,
    selectedMaxDate,
    updateSelectedDate,
    status,
  };
};

import {
  useAoi,
  useDataSets,
  useDate,
  useFootprintCollectionMutation,
  useMode,
  useResults,
  useTrueColorImage,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TInitialForm, TSearchViewState, TUpdateForm } from '@ukri/map/ui-search-view';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo } from 'react';

export const useSearchMode = () => {
  const { searchType, searchParams, updateSearchParams } = useResults();
  const { state: dataSetsState, schema, treeModel, dataSets, updateDataSets } = useDataSets();
  const { state: dateRangeState, date, updateDate } = useDate();
  const { view: currentView, changeView: setCurrentView } = useMode();
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const setFootprints = useFootprintCollectionMutation();
  const { setFeature } = useTrueColorImage();

  const state: TSearchViewState | undefined = useMemo(() => {
    if (dataSetsState === 'edit' && dateRangeState === 'edit') {
      return 'edit';
    } else if (dataSetsState === 'readonly' && dateRangeState === 'readonly') {
      return 'readonly';
    } else if (dataSetsState === 'edit') {
      return 'edit/data-sets';
    } else if (dateRangeState === 'edit') {
      return 'edit/date-range';
    }
  }, [dataSetsState, dateRangeState]);

  const values = useMemo(
    () => ({
      date,
      dataSets,
    }),
    [date, dataSets]
  );

  const changeView = useCallback(
    (view: 'search' | 'results') => {
      switch (view) {
        case 'search': {
          setCurrentView('search');
          changeState('edit');
          return;
        }

        case 'results': {
          setCurrentView('results');
          changeState('readonly');
          return;
        }
      }
    },
    [changeState, setCurrentView]
  );

  const changeToSearchView = useCallback(() => {
    changeView('search');
  }, [changeView]);

  const updateState = useCallback(
    (formData: TInitialForm) => {
      updateDataSets(formData.dataSets);
      updateDate(formData.date);
    },
    [updateDataSets, updateDate]
  );

  const search = useCallback(
    (formData: TUpdateForm) => {
      updateSearchParams({ ...formData, id: nanoid(), timeSliderBoundaries: formData.date });
      changeView('results');
    },
    [changeView, updateSearchParams]
  );

  useEffect(() => {
    setFootprints(data);
  }, [data, setFootprints]);

  useEffect(() => {
    if (status === 'pending') {
      setFootprints(undefined);
      setFeature(undefined);
    }
  }, [status, setFootprints, setFeature]);

  return useMemo(
    () => ({
      data,
      state,
      status,
      view: currentView,
      changeToSearchView,
      schema,
      values,
      treeModel,
      search,
      searchType,
      updateState,
      updateDataSets,
    }),
    [
      data,
      state,
      status,
      currentView,
      changeToSearchView,
      schema,
      values,
      treeModel,
      search,
      searchType,
      updateState,
      updateDataSets,
    ]
  );
};

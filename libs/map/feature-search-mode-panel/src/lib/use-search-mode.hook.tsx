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
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useSearchMode = () => {
  const { searchParams, updateSearchParams } = useResults();
  const { state: dataSetsState, schema, dataSets, updateDataSets } = useDataSets();
  const { state: dateRangeState, date, updateDate } = useDate();
  const { mode } = useMode();
  const [currentMode, setCurrentMode] = useState(mode);
  const [currentView, setCurrentView] = useState<'search' | 'results'>('search');
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
    [changeState]
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
      updateSearchParams(formData);
      changeView('results');
    },
    [changeView, updateSearchParams]
  );

  const displayWorkflowResults = useCallback(
    (workflowId) => {
      changeView('results');
    },
    [changeView]
  );

  useEffect(() => {
    if (mode !== currentMode) {
      if (searchParams) {
        changeView('results');
      } else {
        if (mode === 'action-creator') {
          setCurrentView('search');
        } else {
          changeView('search');
        }
      }
      setCurrentMode(mode);
    }
  }, [mode, currentMode, setCurrentMode, searchParams, changeView]);

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
      search,
      displayWorkflowResults,
      updateState,
    }),
    [data, state, status, currentView, changeToSearchView, schema, values, search, updateState, displayWorkflowResults]
  );
};

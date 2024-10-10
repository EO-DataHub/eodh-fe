import {
  useAoi,
  useDataSets,
  useDate,
  useFootprintCollectionMutation,
  useMode,
  useTrueColorImage,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TInitialForm, TSearchViewState, TUpdateForm } from '@ukri/map/ui-search-view';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useSearchMode = () => {
  const [searchParams, setSearchParams] = useState<TUpdateForm>();
  const { state: dataSetsState, schema, dataSets, updateDataSets } = useDataSets();
  const { state: dateRangeState, date, updateDate } = useDate();
  const { mode } = useMode();
  const [currentMode, setCurrentMode] = useState(mode);
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const setFootprints = useFootprintCollectionMutation();
  const { setStacUrl } = useTrueColorImage();

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

  useEffect(() => {
    // todo move this into data-access layer
    if (mode !== currentMode) {
      setView('search');
      setCurrentMode(mode);
    }
  }, [mode, currentMode, setCurrentMode]);

  const changeView = useCallback(
    (view: 'search' | 'results') => {
      switch (view) {
        case 'search': {
          setView('search');
          changeState('edit');
          return;
        }

        case 'results': {
          setView('results');
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
      setSearchParams(formData);
      changeView('results');
    },
    [changeView]
  );

  useEffect(() => {
    setFootprints(data);
  }, [data, setFootprints]);

  useEffect(() => {
    if (status === 'pending') {
      setFootprints(undefined);
      setStacUrl(undefined);
    }
  }, [status, setFootprints, setStacUrl]);

  return useMemo(
    () => ({
      data,
      state,
      status,
      view,
      changeToSearchView,
      schema,
      values,
      search,
      updateState,
    }),
    [data, state, status, view, changeToSearchView, schema, values, search, updateState]
  );
};

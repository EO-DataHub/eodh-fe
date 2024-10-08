import {
  useAoi,
  useDataSets,
  useDate,
  useFootprintCollectionMutation,
  useMode,
  useTrueColorImage,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TInitialForm, TUpdateForm } from '@ukri/map/ui-search-view';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useSearchMode = () => {
  const [searchParams, setSearchParams] = useState<TUpdateForm>();
  const { schema, dataSets, updateDataSets } = useDataSets();
  const { date, updateDate } = useDate();
  const { mode } = useMode();
  const [currentMode, setCurrentMode] = useState(mode);
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const setFootprints = useFootprintCollectionMutation();
  const { setStacUrl } = useTrueColorImage();

  const state = useMemo(
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
      status,
      view,
      changeToSearchView,
      schema,
      state,
      search,
      updateState,
    }),
    [data, status, view, changeToSearchView, schema, state, search, updateState]
  );
};

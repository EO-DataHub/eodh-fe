import {
  useAoi,
  useDataSets,
  useDate,
  useFootprintCollectionMutation,
  useMode,
  useResults,
  useTrueColorImage,
} from '@ukri/map/data-access-map';
import { TCollection, useCatalogSearch, useGraphSearch } from '@ukri/map/data-access-stac-catalog';
import { TInitialForm, TSearchViewState, TUpdateForm } from '@ukri/map/ui-search-view';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo } from 'react';

export type TSchema = 'search' | 'action-creator';

export const useSearchMode = () => {
  const { searchType, searchParams, updateSearchParams } = useResults();
  const { state: dataSetsState, schema, treeModel, dataSets, updateDataSets } = useDataSets();
  const { state: dateRangeState, date, updateDate } = useDate();
  const { view: currentView, changeView: setCurrentView } = useMode();
  const {
    data,
    status,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage: fetchNextSearchPage,
  } = useCatalogSearch({ params: searchParams });
  const { fetchNextPage: fetchNextChartPage } = useGraphSearch({ params: searchParams });
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
    (formData: TInitialForm, schema: TSchema) => {
      updateDataSets(formData.dataSets, schema);
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

  const fetchNextPage = useCallback(() => {
    fetchNextSearchPage();
    fetchNextChartPage();
  }, [fetchNextChartPage, fetchNextSearchPage]);

  useEffect(() => {
    const collection = data?.pages.reduce(
      (acc, val) => ({
        ...acc,
        type: acc.type ? acc.type : val.type,
        features: [...acc.features, ...val.features],
        links: [...acc.links, ...val.links],
      }),
      { type: undefined, features: [], links: [] } as unknown as TCollection
    );
    setFootprints(collection);
  }, [data, setFootprints]);

  useEffect(() => {
    if (status === 'pending') {
      setFootprints(undefined);
      setFeature(undefined);
    }
  }, [status, setFootprints, setFeature]);

  return useMemo(
    () => ({
      results: data?.pages.map((item) => item.features).flat() || [],
      state,
      status,
      error,
      isFetching,
      hasNextPage,
      fetchNextPage,
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
      error,
      hasNextPage,
      fetchNextPage,
      isFetching,
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

import {
  useChangeAoiMode,
  useData,
  useFootprintCollectionMutation,
  useTrueColorImageUrlMutation,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TForm } from '@ukri/map/ui-search-view';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useSearchMode = () => {
  const { schema, data: searchParams, updateData, state, updateState } = useData();
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });
  const changeAoiMode = useChangeAoiMode();
  const setFootprints = useFootprintCollectionMutation();
  const setTrueColorImage = useTrueColorImageUrlMutation();

  const changeView = useCallback(
    (view: 'search' | 'results') => {
      switch (view) {
        case 'search': {
          setView('search');
          changeAoiMode('search');
          return;
        }

        case 'results': {
          setView('results');
          changeAoiMode('view');
          return;
        }
      }
    },
    [changeAoiMode]
  );

  const changeToSearchView = useCallback(() => {
    changeView('search');
  }, [changeView]);

  const search = useCallback(
    (formData: TForm) => {
      updateData(formData);
      changeView('results');
    },
    [changeView, updateData]
  );

  useEffect(() => {
    setFootprints(data);
  }, [data, setFootprints]);

  useEffect(() => {
    if (status === 'pending') {
      setFootprints(undefined);
      setTrueColorImage(undefined);
    }
  }, [status, setFootprints, setTrueColorImage]);

  return useMemo(
    () => ({
      data,
      status,
      view,
      changeToSearchView,
      state,
      search,
      updateState,
      schema,
    }),
    [data, status, view, changeToSearchView, state, search, updateState, schema]
  );
};

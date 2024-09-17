import {
  useChangeAoiMode,
  useFootprintCollectionMutation,
  useTrueColorImageUrlMutation,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TForm } from '@ukri/map/ui-search-view';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TSearchParams = TForm | undefined;

export const useSearchMode = () => {
  const [searchParams, setSearchParams] = useState<TSearchParams>();
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
      setTrueColorImage(undefined);
    }
  }, [status, setFootprints, setTrueColorImage]);

  return useMemo(
    () => ({
      data,
      status,
      view,
      changeToSearchView,
      searchParams,
      search,
    }),
    [changeToSearchView, data, search, searchParams, status, view]
  );
};

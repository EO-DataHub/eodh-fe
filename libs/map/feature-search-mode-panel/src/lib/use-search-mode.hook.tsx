import {
  useChangeAoiMode,
  useFootprintCollectionMutation,
  useTrueColorImageUrlMutation,
} from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TForm } from '@ukri/map/ui-search-view';
import { useFeatureFlag } from '@ukri/shared/utils/feature-flag';
import { useCallback, useEffect, useMemo, useState } from 'react';

type TSearchParams = TForm | undefined;

export const useSearchMode = () => {
  const [searchParams, setSearchParams] = useState<TSearchParams>();
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });
  const changeAoiMode = useChangeAoiMode();
  const canUseSearch = useFeatureFlag('search');
  const setFootprints = useFootprintCollectionMutation();
  const setTrueColorImage = useTrueColorImageUrlMutation();

  const clearDataLayers = useCallback(() => {
    setFootprints(undefined);
    setTrueColorImage(undefined);
  }, [setFootprints, setTrueColorImage]);

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
      if (!canUseSearch) {
        return;
      }

      clearDataLayers();
      setSearchParams(formData);
      changeView('results');
    },
    [canUseSearch, changeView, clearDataLayers]
  );

  useEffect(() => {
    setFootprints(data);
  }, [data, setFootprints]);

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

import { useCurrentShape } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { SearchView, TForm } from '@ukri/map/ui-search-view';
import { Geometry } from 'ol/geom';
import { useCallback, useState } from 'react';

import { ResultsView } from './results-view.component';

type TSearchParams = (TForm & { aoi: Geometry | undefined }) | undefined;

export const SearchModePanel = () => {
  const [searchParams, setSearchParams] = useState<TSearchParams>();
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });
  const aoi = useCurrentShape();

  const search = useCallback(
    (data: TForm) => {
      setSearchParams({ ...data, aoi });
      setView('results');
    },
    [aoi]
  );

  const changeToSearchView = useCallback(() => {
    setView('search');
  }, []);

  switch (view) {
    case 'results': {
      return <ResultsView status={status} data={data} onBack={changeToSearchView} />;
    }

    default:
    case 'search': {
      return <SearchView defaultValues={searchParams} onSubmit={search} />;
    }
  }
};

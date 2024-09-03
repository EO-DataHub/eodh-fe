import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { ResultsView } from '@ukri/map/ui-results-view';
import { SearchView, TForm } from '@ukri/map/ui-search-view';
import { useCallback, useState } from 'react';

export const SearchModePanel = () => {
  const [searchParams, setSearchParams] = useState<TForm | undefined>();
  const [view, setView] = useState<'search' | 'results'>('search');
  const { data, status } = useCatalogSearch({ params: searchParams });

  const search = useCallback((data: TForm) => {
    setSearchParams(data);
    setView('results');
  }, []);

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

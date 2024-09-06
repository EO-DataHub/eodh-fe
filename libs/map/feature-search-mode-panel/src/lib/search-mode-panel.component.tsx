import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { SearchView, TForm } from '@ukri/map/ui-search-view';
import { Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { Header } from './header.component';
import { ResultsView } from './results-view.component';

type TSearchParams = TForm | undefined;

export const SearchModePanel = () => {
  const [searchParams, setSearchParams] = useState<TSearchParams>();
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
      return (
        <ResultsView status={status} data={data} onBack={changeToSearchView}>
          <Header>
            <button type='button' onClick={changeToSearchView} className='flex items-center *:hover:text-primary'>
              <Icon name='ArrowLeft' className='text-neutral-light' />
              <Text
                content='MAP.SEARCH_MODE_PANEL.HEADER.BACK_TO_DATA_SETS'
                type='h3'
                fontSize='large'
                fontWeight='bold'
                className='text-neutral-dark'
              />
            </button>
          </Header>
        </ResultsView>
      );
    }

    default:
    case 'search': {
      return (
        <SearchView defaultValues={searchParams} onSubmit={search}>
          <Header>
            <Text
              content='MAP.SEARCH_MODE_PANEL.HEADER.BROWSE_DATA_SETS'
              type='h3'
              fontSize='large'
              fontWeight='bold'
              className='text-neutral-dark'
            />
          </Header>
        </SearchView>
      );
    }
  }
};

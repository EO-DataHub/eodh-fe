import { SearchView } from '@ukri/map/ui-search-view';
import { Text } from '@ukri/shared/design-system';

import { Header } from './header.component';
import { ResultsView } from './results-view.component';
import { useSearchMode } from './use-search-mode.hook';

export const SearchModePanel = () => {
  const { schema, data, state, status, values, updateState, view, changeToSearchView, search, searchType } =
    useSearchMode();

  switch (view) {
    case 'results': {
      return <ResultsView status={status} searchType={searchType} data={data} onBack={changeToSearchView} />;
    }

    default:
    case 'search': {
      return (
        <SearchView state={state} defaultValues={values} schema={schema} onChange={updateState} onSubmit={search}>
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

import { SearchView } from '@ukri/map/ui-search-view';
import { Text } from '@ukri/shared/design-system';

import { Header } from './header.component';
import { Notification } from './notification.component';
import { ResultsView } from './results-view.component';
import { useSearchMode } from './use-search-mode.hook';

export const SearchModePanel = () => {
  const {
    schema,
    results,
    state,
    status,
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
    values,
    treeModel,
    updateState,
    view,
    changeToSearchView,
    search,
    searchType,
  } = useSearchMode();

  switch (view) {
    case 'results': {
      if (searchType === 'workflow' || searchType === 'catalogue') {
        return (
          <ResultsView
            status={status}
            error={error}
            isFetching={isFetching}
            searchType={searchType}
            hasNextPage={hasNextPage}
            data={results}
            onBack={changeToSearchView}
            onLoadMore={fetchNextPage}
          />
        );
      }

      return (
        <SearchView
          state={state}
          defaultValues={values}
          treeModel={treeModel.model}
          schema={schema}
          onChange={updateState}
          onSubmit={search}
        >
          <Header>
            <Text
              content='MAP.SEARCH_MODE_PANEL.HEADER.BROWSE_DATA_SETS'
              type='h3'
              fontSize='large'
              fontWeight='bold'
              className='text-neutral-dark p-4 border-b-[1px]'
            />
            <Notification treeModel={treeModel} state={state} />
          </Header>
        </SearchView>
      );
    }

    default:
    case 'search': {
      return (
        <SearchView
          state={state}
          defaultValues={values}
          treeModel={treeModel.model}
          schema={schema}
          onChange={updateState}
          onSubmit={search}
        >
          <Header>
            <Text
              content='MAP.SEARCH_MODE_PANEL.HEADER.BROWSE_DATA_SETS'
              type='h3'
              fontSize='large'
              fontWeight='bold'
              className='text-neutral-dark p-4 border-b-[1px]'
            />
            <Notification treeModel={treeModel} state={state} />
          </Header>
        </SearchView>
      );
    }
  }
};

import { useComparisonMode } from '@ukri/map/data-access-map';
import { NoWorkflowResultsFoundError, TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultsView as UIResultsView } from '@ukri/map/ui-results-view';
import { Icon, Text } from '@ukri/shared/design-system';

import { Header } from './header.component';

type TResultsViewProps = {
  searchType: 'catalogue' | 'workflow' | undefined;
  data: TCollection['features'] | undefined;
  status: 'error' | 'success' | 'pending';
  error: Error | NoWorkflowResultsFoundError | null;
  isFetching: boolean;
  hasNextPage: boolean;
  onBack: () => void;
  onLoadMore: () => void;
};

export const ResultsView = ({
  searchType,
  data,
  status,
  error,
  isFetching,
  hasNextPage,
  onBack,
  onLoadMore,
}: TResultsViewProps) => {
  const { comparisonModeEnabled } = useComparisonMode();

  switch (searchType) {
    case 'workflow': {
      return (
        <div className='flex flex-col flex-1 h-full'>
          <Header>
            <Text
              content='MAP.ACTION_CREATOR_MODE_RESULTS.HEADER.AC_WORKFLOW_RESULTS'
              type='h3'
              fontSize='large'
              fontWeight='bold'
              className='text-neutral-dark p-4'
            />
          </Header>
          <div className='flex-1 overflow-y-auto pb-4 border-t-[1px]'>
            <UIResultsView
              searchType={searchType}
              status={status}
              error={error}
              isFetching={isFetching}
              data={data}
              hasNextPage={hasNextPage}
              onBack={onBack}
              onLoadMore={onLoadMore}
            />
          </div>
        </div>
      );
    }

    case 'catalogue': {
      return (
        <div className='flex flex-col flex-1 h-full'>
          <Header>
            <button
              type='button'
              onClick={onBack}
              className='flex items-center *:hover:text-primary p-4 border-b-[1px]'
              disabled={comparisonModeEnabled}
            >
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
          <div className='flex-1 overflow-y-auto pb-4 border-t-[1px]'>
            <UIResultsView
              searchType={searchType}
              status={status}
              error={error}
              isFetching={isFetching}
              data={data}
              hasNextPage={hasNextPage}
              onBack={onBack}
              onLoadMore={onLoadMore}
            />
          </div>
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

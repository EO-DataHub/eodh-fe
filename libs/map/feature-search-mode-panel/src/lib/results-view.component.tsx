import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultsView as UIResultsView } from '@ukri/map/ui-results-view';
import { Icon, Text } from '@ukri/shared/design-system';

import { Header } from './header.component';

type TResultsViewProps = {
  searchType: 'catalogue' | 'workflow' | undefined;
  data: TCollection | undefined;
  status: 'error' | 'success' | 'pending';
  onBack: () => void;
};

export const ResultsView = ({ searchType, data, status, onBack }: TResultsViewProps) => {
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
              className='text-neutral-dark p-4 border-b-[1px]'
            />
          </Header>
          <div className='flex-1 overflow-y-auto pb-4'>
            <UIResultsView status={status} data={data} onBack={onBack} />
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
          <div className='flex-1 overflow-y-auto pb-4'>
            <UIResultsView status={status} data={data} onBack={onBack} />
          </div>
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

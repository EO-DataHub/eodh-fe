import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultsView as UIResultsView } from '@ukri/map/ui-results-view';
import { PropsWithChildren } from 'react';

type TResultsViewProps = {
  status: 'pending' | 'error' | 'success';
  data: TCollection | undefined;
  onBack: () => void;
};

export const ResultsView = ({ status, data, onBack, children }: PropsWithChildren<TResultsViewProps>) => {
  return (
    <div className='flex flex-col flex-1 h-full'>
      {children}
      <div className='flex-1 overflow-y-auto pb-4'>
        <UIResultsView status={status} data={data} onBack={onBack} />
      </div>
    </div>
  );
};

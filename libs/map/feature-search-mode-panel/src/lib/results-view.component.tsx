import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { useFootprintsLayer } from '@ukri/map/ui-map';
import { ResultsView as UIResultsView } from '@ukri/map/ui-results-view';

type TResultsViewProps = {
  status: 'pending' | 'error' | 'success';
  data: TCollection | undefined;
  onBack: () => void;
};

export const ResultsView = ({ status, data, onBack }: TResultsViewProps) => {
  useFootprintsLayer(data);

  return <UIResultsView status={status} data={data} onBack={onBack} />;
};

import { useCollectionInfo } from '@ukri/map/data-access-map';
import { useResults } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';
import { useCallback } from 'react';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className = '' }: TActionCreatorPanelProps) => {
  const { searchParams, updateSearchParams } = useResults();
  const { data } = useCollectionInfo({
    args: { jobId: searchParams?.jobId, userWorkspace: searchParams?.userWorkspace },
  });

  const updateSearchResultsParams = useCallback(
    (dateFrom: Date, dateTo: Date) => {
      updateSearchParams({
        date: { from: createDateString(dateFrom) ?? undefined, to: createDateString(dateTo) ?? undefined },
        jobId: searchParams?.jobId || '',
        userWorkspace: searchParams?.userWorkspace || '',
      });
      return;
    },
    [searchParams, updateSearchParams]
  );

  return (
    <TimeSlider
      min={createDateString(data?.collectionInterval?.from ?? undefined)}
      max={createDateString(data?.collectionInterval?.to ?? undefined)}
      className={className}
      onUpdate={updateSearchResultsParams}
    />
  );
};

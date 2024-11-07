import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';

// import { useLoadHistoryResults } from '@ukri/map/feature-action-creator-panel';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className = '' }: TActionCreatorPanelProps) => {
  // const { data } = useLoadHistoryResults();
  return (
    <TimeSlider
      // min={createDateString(data?.collectionInterval?.[0] ?? undefined)}
      // max={createDateString(data?.collectionInterval?.[1] ?? undefined)}
      min={createDateString('2022-01-01')}
      max={createDateString('2022-12-31')}
      className={className}
    />
  );
};

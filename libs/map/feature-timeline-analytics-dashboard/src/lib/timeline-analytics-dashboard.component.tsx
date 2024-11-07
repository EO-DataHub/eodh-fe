// import { useResults } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className = '' }: TActionCreatorPanelProps) => {
  // const { searchParams } = useResults();
  // console.log('searchParams', searchParams);
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

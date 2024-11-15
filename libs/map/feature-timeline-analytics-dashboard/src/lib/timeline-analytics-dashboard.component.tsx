import { useMode } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';

import { useTimelineAnalytics } from './use-timeline-analytics.hook';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className }: TActionCreatorPanelProps) => {
  const { sliderMinDate, sliderMaxDate, selectedMinDate, selectedMaxDate, updateSearchResultsParams } =
    useTimelineAnalytics();
  const { mode } = useMode();

  if (!sliderMinDate || !sliderMaxDate) {
    return null;
  }

  return (
    <TimeSlider
      mode={mode}
      min={sliderMinDate}
      max={sliderMaxDate}
      selectedMin={selectedMinDate}
      selectedMax={selectedMaxDate}
      className={className}
      onUpdate={updateSearchResultsParams}
    />
  );
};

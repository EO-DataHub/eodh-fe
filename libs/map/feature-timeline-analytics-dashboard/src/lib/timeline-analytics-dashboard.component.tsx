import { TimeSlider } from '@ukri/shared/ui/time-slider';

import { useTimelineAnalytics } from './use-timeline-analytics.hook';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className }: TActionCreatorPanelProps) => {
  const { sliderMinDate, sliderMaxDate, selectedMinDate, selectedMaxDate, updateSearchResultsParams } =
    useTimelineAnalytics();

  return (
    <TimeSlider
      min={sliderMinDate}
      max={sliderMaxDate}
      selectedMin={selectedMinDate}
      selectedMax={selectedMaxDate}
      className={className}
      onUpdate={updateSearchResultsParams}
    />
  );
};

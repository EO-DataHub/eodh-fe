import { TimeSlider } from '@ukri/shared/ui/time-slider';

import { useTimelineAnalytics } from './use-timeline-analytics.hook';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className }: TActionCreatorPanelProps) => {
  const { minDate, maxDate, selectedMinDate, selectedMaxDate, updateSelectedDate } = useTimelineAnalytics();

  if (!minDate || !maxDate) {
    return null;
  }

  return (
    <TimeSlider
      min={minDate}
      max={maxDate}
      selectedMin={selectedMinDate}
      selectedMax={selectedMaxDate}
      className={className}
      onUpdate={updateSelectedDate}
    />
  );
};

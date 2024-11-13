import { TimeSlider } from '@ukri/shared/ui/time-slider';

import { useTimelineAnalytics } from './use-timeline-analytics.hook';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className }: TActionCreatorPanelProps) => {
  const { minDate, maxDate, updateSearchResultsParams } = useTimelineAnalytics();

  return <TimeSlider min={minDate} max={maxDate} className={className} onUpdate={updateSearchResultsParams} />;
};

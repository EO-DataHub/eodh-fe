import { useComparisonMode } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { useMemo } from 'react';

import { useTimelineAnalytics } from './use-timeline-analytics.hook';

type TActionCreatorPanelProps = {
  className?: string;
};

export const TimelineAnalyticsDashboard = ({ className }: TActionCreatorPanelProps) => {
  const { status, minDate, maxDate, selectedMinDate, selectedMaxDate, updateSelectedDate } = useTimelineAnalytics();
  const { comparisonModeEnabled } = useComparisonMode();

  const disabled = useMemo(() => comparisonModeEnabled || status === 'pending', [comparisonModeEnabled, status]);

  if (!minDate || !maxDate) {
    return null;
  }

  return (
    <div className={className}>
      <TimeSlider
        min={minDate}
        max={maxDate}
        selectedMin={selectedMinDate}
        selectedMax={selectedMaxDate}
        className='grow'
        onUpdate={updateSelectedDate}
        disabled={disabled}
      />
    </div>
  );
};

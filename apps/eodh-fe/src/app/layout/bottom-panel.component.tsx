import { useMode } from '@ukri/map/data-access-map';
import { TimelineAnalyticsDashboard } from '@ukri/map/feature-timeline-analytics-dashboard';

export const BottomPanel = () => {
  const { view } = useMode();

  if (view !== 'results') {
    return null;
  }

  return <TimelineAnalyticsDashboard />;
};

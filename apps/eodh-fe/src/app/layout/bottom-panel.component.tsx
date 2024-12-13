import { useMode } from '@ukri/map/data-access-map';
import { TimelineAnalyticsDashboard } from '@ukri/map/feature-timeline-analytics-dashboard';

interface IBottomPanel {
  className?: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  const { view } = useMode();

  if (view !== 'results') {
    return null;
  }

  return (
    <TimelineAnalyticsDashboard
      className={`w-full h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
    />
  );
};

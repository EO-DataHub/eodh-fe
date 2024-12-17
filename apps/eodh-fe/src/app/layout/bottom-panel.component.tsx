import { useMode } from '@ukri/map/data-access-map';
import { GraphAnalytics } from '@ukri/map/feature-graph-analytics';
import { TimelineAnalyticsDashboard } from '@ukri/map/feature-timeline-analytics-dashboard';

interface IBottomPanel {
  className?: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  const { view } = useMode();

  if (view !== 'results') {
    return (
      <div className='w-full bg-background-main border-b-[1px] border-bright-dark flex flex-col items-center bottom-0'>
        <GraphAnalytics />
      </div>
    );
    // return null;
  }

  return (
    <div className='w-full bg-background-main border-b-[1px] border-bright-dark flex flex-col items-center bottom-0'>
      <TimelineAnalyticsDashboard className={`w-full h-[76px] flex items-center text-text ${className}`} />
      <GraphAnalytics />
    </div>
  );
};

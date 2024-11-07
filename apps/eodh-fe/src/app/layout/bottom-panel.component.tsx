import { useMode } from '@ukri/map/data-access-map';
import { useLoadHistoryResults } from '@ukri/map/feature-action-creator-panel';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';

interface IBottomPanel {
  className?: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  const { view } = useMode();
  const { data } = useLoadHistoryResults();

  if (view !== 'results') {
    return null;
  }

  return (
    <div
      className={`w-full h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
    >
      <TimeSlider
        min={createDateString(data?.collectionInterval?.[0] ?? undefined)}
        max={createDateString(data?.collectionInterval?.[1] ?? undefined)}
        className='grow'
      />
    </div>
  );
};

import { useMode } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';

interface IBottomPanel {
  className?: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  const { view } = useMode();

  if (view === 'results') {
    return (
      <div
        className={`w-full h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
      >
        <TimeSlider
          min={createDateString('2000-01-01T00:00:00+00:00')}
          max={createDateString('2001-01-01T00:00:00+00:00')}
          className='grow'
        />
      </div>
    );
  }
  return null;
};

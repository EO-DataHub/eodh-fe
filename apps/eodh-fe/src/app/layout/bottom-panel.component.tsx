import { TimeSlider } from '@ukri/shared/design-system';

interface IBottomPanel {
  className: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  return (
    <div
      className={`ml-[360px] w-[calc(100%-360px)] h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
    >
      <TimeSlider min='2000-01-01T00:00:00+00:00' max='2018-10-01T00:00:00+00:00' className='grow' />
    </div>
  );
};

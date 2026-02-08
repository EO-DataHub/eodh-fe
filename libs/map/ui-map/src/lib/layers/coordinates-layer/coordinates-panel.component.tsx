import { Icon } from '@ukri/shared/design-system';

import { Coordinates } from './coordinates.component';

interface ICoordinatesPanelProps {
  className?: string;
}

export const CoordinatesPanel = ({ className }: ICoordinatesPanelProps) => {
  return (
    <div className={`absolute left-10 top-2 ${className}`}>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-col max-w-xs'>
        <div className='flex flex-row items-center mb-2 pb-2 border-b border-bright-dark'>
          <Icon name='Map' width={24} height={24} className='text-neutral-light pr-2' />
          <span className='text-sm font-semibold'>Coordinates</span>
        </div>
        <Coordinates />
      </div>
    </div>
  );
};

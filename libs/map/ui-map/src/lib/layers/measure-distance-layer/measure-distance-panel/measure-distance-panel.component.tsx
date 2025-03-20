import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { Distance } from './measure-distance.component';
import { SwitchGeometryButton } from './switch-geometry-button.component';
import { SwitchUnitButton } from './switch-unit-button.component';

interface IMeasureDistancePanelProps {
  className?: string;
}

export const MeasureDistancePanel = ({ className }: IMeasureDistancePanelProps) => {
  const { visible } = useMeasureDistance();

  if (!visible) {
    return;
  }

  return (
    <div className={`absolute left-10 top-2 ${className}`}>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-row'>
        <Icon name='Straighten' width={24} height={24} className='text-neutral-light pr-2' />
        <Distance className='px-1' />
        <SwitchUnitButton className='ml-1 px-2 border-l-[1px] border-bright-dark' />
        <SwitchGeometryButton className='pl-2 border-l-[1px] border-bright-dark' />
      </div>
    </div>
  );
};

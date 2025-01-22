import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon, Text, Toggle } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { MeasureDistanceLayerContext } from './measure-distance-layer.component';
import { TUnit, useDistance } from './use-distance.hook';

const AreaDistance = ({ area, className = '' }: { area?: TUnit; className?: string }) => {
  if (!area) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={
          <span>
            {area.value} {area.unit.displayedValue}
            <sup>2</sup>
          </span>
        }
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

const LineDistance = ({ distance, className = '' }: { distance?: TUnit; className?: string }) => {
  if (!distance) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={`${distance.value} ${distance.unit.displayedValue}`}
        type='p'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

const MeasureValue = ({ className }: { className?: string }) => {
  const { area, distance } = useDistance();

  return (
    <>
      <LineDistance distance={distance} className={className} />
      <AreaDistance area={area} className={className} />
    </>
  );
};

const SwitchUnitButton = ({ className = '' }: { className?: string }) => {
  const { unit, setUnit } = useContext(MeasureDistanceLayerContext);

  const changeUnit = useCallback(() => {
    setUnit(unit === 'km' ? 'miles' : 'km');
  }, [setUnit, unit]);

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <Text
        className={`pr-0.5 ${unit === 'km' ? 'text-primary' : 'text-neutral-light'}`}
        content='MAP.MEASUREMENTS.PANEL.KM'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
      <Toggle id='measureDistance' checked={unit === 'miles'} onChange={changeUnit} type='switch' />
      <Text
        className={`pl-0.5 ${unit === 'miles' ? 'text-primary' : 'text-neutral-light'}`}
        content='MAP.MEASUREMENTS.PANEL.MILES'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

const SwitchGeometryButton = ({ className = '' }: { className?: string }) => {
  const { drawType, setDrawType } = useContext(MeasureDistanceLayerContext);

  const changeGeometry = useCallback(() => {
    setDrawType(drawType === 'polygon' ? 'line' : 'polygon');
  }, [drawType, setDrawType]);

  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      <Icon
        className={`pr-0.5 ${drawType === 'line' ? 'text-primary' : 'text-neutral-light'}`}
        name='LineString'
        width={24}
        height={24}
      />
      <Toggle id='changeGeometry' checked={drawType === 'polygon'} onChange={changeGeometry} type='switch' />
      <Icon
        className={`pl-0.5 ${drawType === 'polygon' ? 'text-primary' : 'text-neutral-light'}`}
        name='Geometry'
        width={24}
        height={24}
      />
    </div>
  );
};

export const MeasureDistancePanel = () => {
  const { visible } = useMeasureDistance();

  if (!visible) {
    return;
  }

  return (
    <div className='absolute left-10 top-5 z-50'>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-row'>
        <Icon name='Straighten' width={24} height={24} className='text-neutral-light pr-2' />
        <MeasureValue className='px-1' />
        <SwitchUnitButton className='ml-1 px-2 border-l-[1px] border-bright-dark' />
        <SwitchGeometryButton className='pl-2 border-l-[1px] border-bright-dark' />
      </div>
    </div>
  );
};

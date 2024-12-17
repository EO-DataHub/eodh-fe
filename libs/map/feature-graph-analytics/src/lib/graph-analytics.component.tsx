import { Button } from '@ukri/shared/design-system';
import { useCallback, useMemo, useState } from 'react';

import { LandCover } from './land-cover.component';
import { WaterQuality } from './water-quality.component';

export const GraphAnalytics = () => {
  const [chartType, setChartType] = useState<'landCover' | 'waterQuality'>('landCover');
  const landCoverEnabled = useMemo(() => chartType === 'landCover', [chartType]);
  const waterQualityEnabled = useMemo(() => chartType === 'waterQuality', [chartType]);

  const changeToWaterQuality = useCallback(() => {
    setChartType('waterQuality');
  }, []);

  const changeToLandCover = useCallback(() => {
    setChartType('landCover');
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-row-reverse m-4'>
        <Button text='Water Quality' type='button' disabled={waterQualityEnabled} onClick={changeToWaterQuality} />
        <Button text='Land Cover' type='button' disabled={landCoverEnabled} onClick={changeToLandCover} />
      </div>
      {landCoverEnabled && <LandCover />}
      {waterQualityEnabled && <WaterQuality />}
    </div>
  );
};

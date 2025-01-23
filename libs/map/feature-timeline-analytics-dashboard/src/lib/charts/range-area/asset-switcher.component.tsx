import { Select } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { TSeriesItem } from './range-area-chart.model';

export type TOption = {
  value: string;
  label: string;
};

type TLegendProps = {
  value: string | undefined;
  series: TSeriesItem[];
  onChange: (value: string | undefined) => void;
};

export const AssetSwitcher = ({ series, value, onChange }: TLegendProps) => {
  const options = useMemo(() => series.map((item) => ({ value: item.assetName, label: item.title })), [series]);

  if (series.length <= 1) {
    return;
  }

  return (
    <div className='relative z-10 flex justify-center w-full my-2'>
      <Select size='md' className='w-72' options={options} value={value} onChange={onChange} />
    </div>
  );
};

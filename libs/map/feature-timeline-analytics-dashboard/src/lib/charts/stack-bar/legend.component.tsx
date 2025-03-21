import { Text } from '@ukri/shared/design-system';

import { TChartItem } from './bar-chart.model';

type TLegendProps = {
  series: TChartItem[];
  height: number;
  onLegendItemClick: (seriesName: string) => void;
};

export const Legend = ({ series, height, onLegendItemClick }: TLegendProps) => {
  return (
    <div className={`max-w-[30%] mx-5 overflow-scroll`} style={{ maxHeight: height }}>
      {series.map((seriesItem) => (
        <div
          className={`flex items-center my-1 cursor-pointer ${seriesItem.hidden ? 'opacity-45' : ''}`}
          key={seriesItem.name}
          onClick={() => onLegendItemClick(seriesItem.name)}
        >
          <span className='relative flex align-center justify-center cursor-pointer min-h-2 min-w-2 h-2 w-2 left-0 top-0 mr-2'>
            <span className='rounded-full w-full h-full' style={{ backgroundColor: seriesItem.color }}></span>
          </span>
          <Text content={seriesItem.name} type='span' fontSize='medium' fontWeight='semibold' fontType='body' />
        </div>
      ))}
    </div>
  );
};

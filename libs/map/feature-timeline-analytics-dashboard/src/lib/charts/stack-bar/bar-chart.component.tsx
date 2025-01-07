import { TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { defaultOptions, TChartItem } from './bar-chart.model';
import { Container } from './container.component';
import { Legend } from './legend.component';

type TBarChartProps = {
  height: number;
  series: TChartItem[];
  color: string;
  unit: string;
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

export const BarChart = ({ color, unit, series, categories, height, onLegendClick }: TBarChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      chart: {
        stacked: true,
      },
      xaxis: {
        type: 'datetime',
        categories,
      },
      yaxis: [
        {
          labels: {
            formatter: (value) => `${value.toString()} ${unit}`,
          },
        },
      ],
      colors: [color],
    }),
    [categories, color, unit]
  );

  return (
    <Container>
      <Chart options={options} series={series} type='bar' height={height} className='flex flex-grow' />
      <Legend series={series} height={height} onLegendItemClick={onLegendClick} />
    </Container>
  );
};

import { TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { defaultOptions, TChartItem } from './bar-chart.model';

type TBarChartProps = {
  height: number;
  series: TChartItem[];
  color: string;
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

export const BarChart = ({ color, height, onLegendClick, series, categories }: TBarChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      chart: {
        stacked: true,
        events: {
          legendClick: (chart: unknown, seriesIndex?: number) => {
            onLegendClick(seriesIndex);
          },
        },
      },
      xaxis: {
        type: 'datetime',
        categories,
      },
      yaxis: [
        {
          labels: {
            formatter: (value) => value.toString(),
          },
        },
        {
          forceNiceScale: false,
          min: 0,
          max: 100,
          tickAmount: 5,
          opposite: true,
          labels: {
            formatter: (value) => value.toFixed(0) + '%',
          },
        },
      ],
      // yaxis: chartSeries.map(item => item.n)
      colors: [color],
    }),
    [categories, color, onLegendClick]
  );

  return <Chart options={options} series={series} type='bar' height={height} />;
};

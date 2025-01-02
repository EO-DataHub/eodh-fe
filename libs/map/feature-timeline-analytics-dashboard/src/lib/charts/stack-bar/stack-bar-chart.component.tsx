import { TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { defaultOptions, TChartItem } from './bar-chart.model';

type TStackBarChartProps = {
  height: number;
  series: TChartItem[];
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

export const StackBarChart = ({ series, categories, height, onLegendClick }: TStackBarChartProps) => {
  const stackBarChartOptions = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      chart: {
        stacked: true,
        stackType: '100%',
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
            formatter: (value) => `${value}%`,
          },
        },
      ],
      colors: series.map((item) => item.color),
    }),
    [series, categories, onLegendClick]
  );

  return <Chart options={stackBarChartOptions} series={series} type='bar' height={height} />;
};

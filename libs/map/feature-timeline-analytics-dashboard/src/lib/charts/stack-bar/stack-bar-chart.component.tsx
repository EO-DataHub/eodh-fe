import { TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import { defaultOptions, TChartItem } from './bar-chart.model';
import { Container } from './container.component';
import { Legend } from './legend.component';
import { renderTooltip } from './tooltip.component';
import { roundValue } from './utils';

type TStackBarChartProps = {
  height: number;
  series: TChartItem[];
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

interface IApexGlobals {
  globals: {
    seriesX: TChartItem['data'][];
    seriesPercent: TChartItem['data'][];
    colors: string[];
    initialSeries: {
      name: string;
      color: string;
      type: string;
      group: string;
      data: { x: number; y: number | null }[];
    }[];
  };
}

interface IApexOptions {
  series: TChartItem['data'][];
  seriesIndex: number;
  dataPointIndex: number;
  w: IApexGlobals;
}

export const StackBarChart = ({ series, categories, height, onLegendClick }: TStackBarChartProps) => {
  const stackBarChartOptions = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      chart: {
        stacked: true,
        stackType: '100%',
      },
      colors: series.map((item) => item.color),
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
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }: IApexOptions) => {
          const rawValue = series[seriesIndex][dataPointIndex];
          const percentageValue = w.globals.seriesPercent[seriesIndex][dataPointIndex];
          const pointConfig = w.globals.initialSeries[seriesIndex];

          const items = [
            {
              color: pointConfig.color,
              displayedValue: roundValue(rawValue).toString(),
              name: 'Value',
            },
            {
              color: pointConfig.color,
              displayedValue: `${roundValue(percentageValue)}%`,
              name: 'Percentage',
            },
          ];

          // console.log('tooltip', series, seriesIndex, dataPointIndex, w, pointConfig, items);

          return renderToString(renderTooltip({ items, name: pointConfig.name }));
        },
      },
    }),
    [series, categories]
  );

  return (
    <Container>
      <Chart options={stackBarChartOptions} series={series} type='bar' height={height} className='flex flex-grow' />
      <Legend series={series} height={height} onLegendItemClick={onLegendClick} />
    </Container>
  );
};

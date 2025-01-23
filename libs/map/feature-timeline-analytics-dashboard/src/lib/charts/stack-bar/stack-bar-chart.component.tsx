import { createDateString, formatDateTime, TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import { renderTooltip } from '../tooltip.component';
import { roundValue } from '../utils';
import { defaultOptions, IApexOptions, TChartItem } from './bar-chart.model';
import { Container } from './container.component';
import { Legend } from './legend.component';

type TStackBarChartProps = {
  height: number;
  series: TChartItem[];
  unit: string;
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

export const StackBarChart = ({ series, categories, unit, height, onLegendClick }: TStackBarChartProps) => {
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
          const dateInMilliseconds = w.globals.seriesX[seriesIndex][dataPointIndex];
          const pointConfig = w.globals.initialSeries[seriesIndex];

          const items = [
            {
              translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.STACK_BAR.TOOLTIP.VALUE',
              displayedValue: `${roundValue(rawValue).toString()} ${unit}`,
            },
            {
              translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.STACK_BAR.TOOLTIP.PERCENTAGE',
              displayedValue: `${roundValue(percentageValue)}%`,
            },
            {
              translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.STACK_BAR.TOOLTIP.DATE',
              displayedValue: formatDateTime(
                createDateString(new Date(dateInMilliseconds)),
                'YYYY-MM-DD',
                'HH:mm:ss.mmm'
              ),
            },
          ];

          return renderToString(renderTooltip({ items, name: pointConfig.name, color: pointConfig.color }));
        },
      },
    }),
    [series, categories, unit]
  );

  if (!series.length || series.every((item) => item.hidden)) {
    return;
  }

  return (
    <Container>
      <Chart options={stackBarChartOptions} series={series} type='bar' height={height} className='flex flex-grow' />
      <Legend series={series} height={height} onLegendItemClick={onLegendClick} />
    </Container>
  );
};

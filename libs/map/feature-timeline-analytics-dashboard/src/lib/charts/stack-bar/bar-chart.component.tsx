import { createDateString, formatDate, TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import cloneDeep from 'lodash/cloneDeep';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import { renderTooltip } from '../tooltip.component';
import { defaultOptions, IApexOptions, TChartItem } from './bar-chart.model';
import { Container } from './container.component';
import { Legend } from './legend.component';
import { roundValue } from './utils';

type TBarChartProps = {
  height: number;
  series: TChartItem[];
  allSeriesItems: TChartItem[];
  color: string;
  unit: string;
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

export const BarChart = ({
  color,
  unit,
  series,
  allSeriesItems,
  categories,
  height,
  onLegendClick,
}: TBarChartProps) => {
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
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }: IApexOptions) => {
          const rawValue = series[seriesIndex][dataPointIndex];
          const dateInMilliseconds = w.globals.seriesX[seriesIndex][dataPointIndex];
          const pointConfig = w.globals.initialSeries[seriesIndex];

          const items = [
            {
              name: 'Value',
              displayedValue: `${roundValue(rawValue).toString()} ${unit}`,
            },
            {
              name: 'Date',
              displayedValue: formatDate(createDateString(new Date(dateInMilliseconds))),
            },
          ];

          return renderToString(renderTooltip({ items, name: pointConfig.name, color: pointConfig.color }));
        },
      },
    }),
    [categories, color, unit]
  );
  const chartSeries = useMemo(() => cloneDeep(series), [series]);

  if (!series.length || series.every((item) => item.hidden)) {
    return;
  }

  return (
    <Container>
      <Chart options={options} series={chartSeries} type='bar' height={height} className='flex flex-grow' />
      <Legend series={allSeriesItems} height={height} onLegendItemClick={onLegendClick} />
    </Container>
  );
};

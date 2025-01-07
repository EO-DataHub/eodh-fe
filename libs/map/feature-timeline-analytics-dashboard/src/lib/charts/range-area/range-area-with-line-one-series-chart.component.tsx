import { ApexOptions } from 'apexcharts';
import isNumber from 'lodash/isNumber';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { TSeriesItem } from './range-area-chart.model';

const defaultOptions: ApexOptions = {
  chart: {
    animations: {
      speed: 500,
    },
  },
  dataLabels: {
    enabled: true,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  xaxis: {
    type: 'datetime',
  },
};

const getRangeAreaValues = (series: TSeriesItem) => ({
  type: 'rangeArea',
  name: 'Range',
  data: series.data.map((item) => ({
    x: item.timestamp,
    y: [item.min, item.max],
  })),
  hidden: series.hidden,
});

const getLineChartValues = (series: TSeriesItem) => ({
  type: 'line',
  name: 'Median',
  data: series.data.map((item) => ({
    x: item.timestamp,
    y: item.median,
  })),
  hidden: series.hidden,
});

type TRangeAreaWithLineOneSeriesChartProps = {
  series: TSeriesItem[];
  height: number;
};

export const RangeAreaWithLineOneSeriesChart = ({ series, height }: TRangeAreaWithLineOneSeriesChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      colors: series.map((item) => [item.color, item.color]).flat(),
      fill: {
        opacity: series.map(() => [0.24, 1]).flat(),
      },
      stroke: {
        curve: 'straight',
        width: series.map(() => [0, 1]).flat(),
      },
      legend: {
        show: false,
      },
      yaxis: [
        {
          labels: {
            formatter: (value) => {
              const unit = series.filter((item) => !item.hidden).pop()?.unit;
              if (isNumber(value)) {
                if (unit) {
                  return `${value.toString()} ${unit}`;
                }

                return value.toString();
              }

              return '';
            },
          },
        },
      ],
    }),
    [series]
  );

  const chartSeries = useMemo(
    (): ApexOptions['series'] =>
      series.map((series) => [getRangeAreaValues(series), getLineChartValues(series)]).flat(),
    [series]
  );

  if (!series.length) {
    return;
  }

  return <Chart options={options} series={chartSeries} type='rangeArea' height={height} />;
};

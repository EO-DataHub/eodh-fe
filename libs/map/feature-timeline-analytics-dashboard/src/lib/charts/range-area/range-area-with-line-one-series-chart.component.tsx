import { ApexOptions } from 'apexcharts';
import isNumber from 'lodash/isNumber';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { createTooltip } from './create-tooltip';
import { TSeriesItem } from './range-area-chart.model';

const defaultOptions: ApexOptions = {
  grid: {
    padding: {
      top: 0,
      right: 20,
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
    x: new Date(item.timestamp as string).getTime(),
    y: [item.min, item.max],
  })),
  hidden: series.hidden,
});

const getLineChartValues = (series: TSeriesItem) => ({
  type: 'line',
  name: 'Median',
  data: series.data.map((item) => ({
    x: new Date(item.timestamp as string).getTime(),
    y: item.median,
  })),
  hidden: series.hidden,
});

type TRangeAreaWithLineOneSeriesChartProps = {
  series: TSeriesItem[];
  selectedAssetName: string | undefined;
  height: number;
};

export const RangeAreaWithLineOneSeriesChart = ({
  series,
  selectedAssetName,
  height,
}: TRangeAreaWithLineOneSeriesChartProps) => {
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
      tooltip: {
        custom: createTooltip(series, selectedAssetName),
      },
      yaxis: [
        {
          labels: {
            formatter: (value) => {
              const unit = series.find((item) => item.assetName === selectedAssetName)?.unit || '';
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
    [series, selectedAssetName]
  );

  const chartSeries = useMemo(
    (): ApexOptions['series'] =>
      series.map((series) => [getRangeAreaValues(series), getLineChartValues(series)]).flat(),
    [series]
  );

  if (!selectedAssetName || !series.length || series.every((item) => item.hidden)) {
    return;
  }

  return <Chart options={options} series={chartSeries} height={height} type='rangeArea' />;
};

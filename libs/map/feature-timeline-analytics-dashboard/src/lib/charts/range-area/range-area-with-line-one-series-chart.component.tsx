import { createDate, createDateString, formatDate } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import isNumber from 'lodash/isNumber';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

import ApexChart from '../../react-apexcharts.component';
import { IParsedSeriesData, renderTooltip } from '../stack-bar/tooltip.component';
import { roundValue } from '../stack-bar/utils';
import { TSeriesItem } from './range-area-chart.model';

const defaultOptions = (chartSeries: TSeriesItem[]): ApexOptions => ({
  // chart: {
  //   animations: {
  //     speed: 500,
  //   },
  // },
  // dataLabels: {
  //   enabled: true,
  // },
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
  // xaxis: {
  //   tooltip: {
  //     enabled: false,
  //   },
  //   axisBorder: {
  //     show: true,
  //   },
  //   type: 'numeric' as const,
  //   labels: {
  //     // rotate: 0,
  //     datetimeUTC: false,
  //     formatter: (value: number | string | undefined) => {
  //       if (!value) {
  //         return '';
  //       }
  //       const dateString = createDateString(new Date(value));
  //       const date = createDate(dateString);
  //       const formatter = formatDate(dateString);
  //       console.log('abc', formatter, value);
  //       // if (monthsRange > 3) {
  //       //   if (date?.getDate() === 1) {
  //       //     return formatter;
  //       //   }
  //       // } else if (monthsRange > 1) {
  //       //   if (date?.getDay() === 1) {
  //       //     return formatter;
  //       //   }
  //       // } else {
  //       //   if (date?.getHours() === 0) {
  //       //     return formatter;
  //       //   }
  //       // }
  //       return formatter?.toString() || '';
  //     },
  //   },
  //   tickAmount: 'dataPoints' as const,
  //   axisTicks: {
  //     show: false,
  //   },
  // },
  tooltip: {
    shared: true,
    intersect: false,
    // x: {
    //   show: false,
    // },
    //     y: {
    //       formatter: (y, options) => {
    //         if (!options) {
    //           return '';
    //         }
    //         const { series, dataPointIndex } = options;
    //         const unit = chartSeries.filter((item) => !item.hidden).pop()?.unit;
    //         const rangeValue = series[0][dataPointIndex];
    //         const medianValue = series[1][dataPointIndex];
    //
    //         console.log('y', y, options);
    //
    //         return `<div>
    // <div><span>Range:</span><span>${rangeValue !== undefined ? rangeValue : ''}</span></div>
    // <div><span>Median:</span><span>${medianValue !== undefined ? medianValue : ''}</span></div>
    // </div>`
    //       },
    //       title: {
    //         formatter: () => '',
    //       }
    //     }
  },
});

const getRangeAreaValues = (series: TSeriesItem) => ({
  type: 'rangeArea',
  name: 'Range',
  data: series.data.map((item) => ({
    x: new Date(item.timestamp as string).getTime(),
    y: [item.min, item.max],
  })),
  hidden: series.hidden,
});

const getLineChartValues = (series: TSeriesItem, index: number) => ({
  type: 'line',
  name: 'Median',
  data: series.data.map((item) => ({
    x: new Date(item.timestamp as string).getTime(),
    y: item.median,
  })),
  hidden: series.hidden,
});

interface IApexGlobals {
  globals: {
    seriesX: ApexOptions['series'];
    seriesPercent: ApexOptions['series'];
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
  series: ApexOptions['series'];
  seriesIndex: number;
  dataPointIndex: number;
  w: IApexGlobals;
}

type TRangeAreaWithLineOneSeriesChartProps = {
  id: string;
  series: TSeriesItem[];
  height: number;
};

export const RangeAreaWithLineOneSeriesChart = ({ id, series, height }: TRangeAreaWithLineOneSeriesChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      ...defaultOptions(series),
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
      // tooltip: {
      //   custom: ({ series, seriesIndex, dataPointIndex, w }: IApexOptions) => {
      //     const rawValue = series[seriesIndex][dataPointIndex];
      //     const pointConfig = w.globals.initialSeries[seriesIndex];
      //
      //     console.log('series', series, seriesIndex, dataPointIndex, w);
      //
      //     // const parsedSeries = series?.reduce<IParsedSeriesData[]>((acc, item, index) => {
      //     //   if (!item) {
      //     //     return acc;
      //     //   }
      //     //
      //     //   const value = item[dataPointIndex];
      //     //   const pointConfig = w.globals.initialSeries[index];
      //     //   const current = chartData.find((item) => item.name === pointConfig.name);
      //     //
      //     //   return current && (value || value === 0)
      //     //     ? [
      //     //         ...acc,
      //     //         {
      //     //           color: w.globals.colors[index],
      //     //           name: current?.name || '',
      //     //           displayedValue: getFormattedValue(String(value), current?.uom || null),
      //     //         },
      //     //       ]
      //     //     : acc;
      //     // }, []);
      //
      //     const items = [
      //       {
      //         color: pointConfig.color,
      //         displayedValue: roundValue(rawValue).toString(),
      //         name: 'Value',
      //       },
      //       // {
      //       //   color: pointConfig.color,
      //       //   displayedValue: `${roundValue(percentageValue)}%`,
      //       //   name: 'Percentage',
      //       // },
      //     ];
      //
      //     // console.log('tooltip', series, seriesIndex, dataPointIndex, w, pointConfig, items);
      //
      //     return renderToString(renderTooltip({ items, name: pointConfig.name }));
      //   },
      // },
      // yaxis: [
      //   {
      //     labels: {
      //       formatter: (value) => {
      //         const unit = series.filter((item) => !item.hidden).pop()?.unit;
      //         if (isNumber(value)) {
      //           if (unit) {
      //             return `${value.toString()} ${unit}`;
      //           }
      //
      //           return value.toString();
      //         }
      //
      //         return '';
      //       },
      //     },
      //   },
      // ],
    }),
    [series]
  );

  const chartSeries = useMemo(
    (): ApexOptions['series'] =>
      series.map((series) => [getRangeAreaValues(series), getLineChartValues(series)]).flat(),
    [series]
  );

  console.log('chartSeries', chartSeries, series);

  if (!series.length) {
    return;
  }

  return <ApexChart id={id} options={options} series={chartSeries} height={height} type='rangeArea' />;
  // return <Chart options={options} series={chartSeries} height={height} type='rangeArea' />;
};

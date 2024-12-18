import { ApexOptions } from 'apexcharts';
import { useMemo } from 'react';
import Chart from 'react-apexcharts';

import { data, TWaterQualityItem } from './data/water-quailty.data';

const getMedian = (items: TWaterQualityItem[]) => {
  return items.map((item) => ({
    x: item.timestamp,
    y: parseFloat(item.median.toString()).toFixed(2),
  }));
};

const getRangeArea = (items: TWaterQualityItem[]) => {
  return (
    items.map((item) => ({
      x: item.timestamp,
      y: [parseFloat(item.minimum.toString()).toFixed(2), parseFloat(item.maximum.toString()).toFixed(2)],
    })) || []
  );
};

export const WaterQuality = () => {
  const options = useMemo(
    (): ApexOptions => ({
      chart: {
        height: 350,
        type: 'rangeArea',
        animations: {
          speed: 500,
        },
      },
      colors: ['#d4526e'],
      stroke: {
        curve: 'straight',
        width: [0, 2],
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        position: 'top',
        customLegendItems: ['Team A'],
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const series1 = series[seriesIndex];
          const series2 = series[seriesIndex + 1];
          const series3 = series[seriesIndex - 1];
          const dataPoint1 = series1 ? series1[dataPointIndex] : '';
          const dataPoint2 = series2 ? series2[dataPointIndex] : '';
          const dataPoint3 = series3 ? series3[dataPointIndex] : '';
          return `<div class="arrow_box">
            <div>median: ${dataPoint1}</div>
            <div>min: ${dataPoint3}</div>
            <div>max: ${dataPoint2}</div>
            </div>`;
        },
      },
      grid: {
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    }),
    []
  );

  const series = useMemo(
    () => [
      {
        type: 'rangeArea',
        name: 'Range',
        data: getRangeArea(data),
      },
      {
        type: 'line',
        name: 'Median',
        data: getMedian(data),
      },
    ],
    []
  );

  return <Chart options={options} series={series} type='rangeArea' height={160} />;
};

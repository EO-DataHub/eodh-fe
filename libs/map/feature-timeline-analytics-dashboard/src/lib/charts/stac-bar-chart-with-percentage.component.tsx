import { TDateString } from '@ukri/shared/utils/date';
import { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

type TChartItem = {
  name: string;
  value: number[];
  color: string;
};

type TSeriesItem = {
  data: TChartItem[];
  name: string;
};

type TBarChartProps = {
  index: number;
  height: number;
  series: TSeriesItem[];
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

const defaultOptions: ApexOptions = {
  fill: {
    opacity: 1,
  },
  legend: {
    show: true,
    position: 'top',
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
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
};

const BarChart = ({ index, height, onLegendClick, series, categories }: TBarChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      ...defaultOptions,
      chart: {
        stacked: true,
        events: {
          legendClick: (chart: unknown, seriesIndex?: number) => {
            onLegendClick(seriesIndex === index ? undefined : seriesIndex);
          },
        },
      },
      xaxis: {
        type: 'datetime',
        categories,
      },
      yaxis: series.map((item) => ({ seriesName: item.name })),
      colors: [[...series].pop()].map((seriesItem) => seriesItem?.data[index].color),
    }),
    [categories, series, index, onLegendClick]
  );

  const chartSeries = useMemo(
    () =>
      series.map((itemSeries) => ({
        name: itemSeries.name,
        data: itemSeries.data.map((data) => data.value),
        // hidden: index !== undefined ? currentIndex !== index : false,
      })),
    [series]
  );

  return <Chart options={options} series={chartSeries} type='bar' height={height} />;
};

type TStackBarChartProps = {
  height: number;
  series: TSeriesItem[];
  categories: TDateString[] | string[];
  onLegendClick: (index: number | undefined) => void;
};

const StackBarChart = ({ series, categories, height, onLegendClick }: TStackBarChartProps) => {
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
      yaxis: series.map((item, index) => ({ seriesName: item.name, opposite: index !== 0 })),
      colors: [[...series].pop()].map((seriesItem) => seriesItem?.data.map((item) => item.color)),
    }),
    [series, categories, onLegendClick]
  );

  const chartSeries = useMemo(
    () =>
      series.map((itemSeries) => ({
        name: itemSeries.name,
        data: itemSeries.data.map((item) => item.value.flat()),
      })),
    [series]
  );

  return <Chart options={stackBarChartOptions} series={chartSeries} type='bar' height={height} />;
};

type TChartData = {
  series: TSeriesItem[];
  categories: TDateString[] | string[];
  height: number;
};

export const StackedBarChart = ({ series, categories, height }: TChartData) => {
  const [index, setIndex] = useState<number | undefined>(undefined);

  if (index !== undefined) {
    return <BarChart series={series} categories={categories} index={index} height={height} onLegendClick={setIndex} />;
  }

  return <StackBarChart series={series} categories={categories} height={height} onLegendClick={setIndex} />;
};

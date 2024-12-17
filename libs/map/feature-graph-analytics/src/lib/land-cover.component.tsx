import { ApexOptions } from 'apexcharts';
import { useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

import { getData } from './data/land-cover.data';

type TLandCoverBarChartProps = {
  index: number;
  height: number;
  onLegendClick: (index: number | undefined) => void;
};

const LandCoverBarChart = ({ index, height, onLegendClick }: TLandCoverBarChartProps) => {
  const options = useMemo(
    (): ApexOptions => ({
      chart: {
        stacked: true,
        events: {
          legendClick: (chart: unknown, seriesIndex?: number) => {
            onLegendClick(seriesIndex === index ? undefined : seriesIndex);
          },
        },
      },
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
      title: {
        text: 'Land Cover Bar',
      },
      xaxis: {
        type: 'datetime',
        categories: getData()
          .pop()
          ?.area.map((item) => item.x)
          .flat(),
      },
      colors: [getData()[index || 0].colorHint],
    }),
    [index, onLegendClick]
  );

  const series = useMemo(
    () =>
      getData().map((series, currentIndex) => ({
        name: series.name,
        data: series.area.map((item) => item.y),
        hidden: index !== undefined ? currentIndex !== index : false,
      })),
    [index]
  );

  return <Chart options={options} series={series} type='bar' height={height} />;
};

type TLandCoverStackBarChartProps = {
  height: number;
  onLegendClick: (index: number | undefined) => void;
};

const LandCoverStackBarChart = ({ height, onLegendClick }: TLandCoverStackBarChartProps) => {
  const stackBarChartOptions = useMemo(
    (): ApexOptions => ({
      chart: {
        stacked: true,
        stackType: '100%',
        events: {
          legendClick: (chart: unknown, seriesIndex?: number) => {
            onLegendClick(seriesIndex);
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      title: {
        text: 'Land Cover StacBar 100',
      },
      xaxis: {
        type: 'datetime',
        categories: getData()
          .pop()
          ?.area.map((item) => item.x)
          .flat(),
      },
      colors: getData().map((item) => item.colorHint),
    }),
    [onLegendClick]
  );

  const series = useMemo(
    () =>
      getData().map((series) => ({
        name: series.name,
        data: series.area.map((item) => item.y),
      })),
    []
  );

  return <Chart options={stackBarChartOptions} series={series} type='bar' height={height} />;
};

export const LandCover = () => {
  const [index, setIndex] = useState<number | undefined>(undefined);

  if (index !== undefined) {
    return <LandCoverBarChart height={350} index={index} onLegendClick={setIndex} />;
  }

  return <LandCoverStackBarChart height={350} onLegendClick={setIndex} />;
};

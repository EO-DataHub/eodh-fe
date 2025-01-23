import { TDateString } from '@ukri/shared/utils/date';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BarChart } from './bar-chart.component';
import { StackBarChart } from './stack-bar-chart.component';
import { roundValue } from './utils';

type TChartItem = {
  name: string;
  value: number[];
  percentage: number[];
  color: string;
};

const mapToChartSeries = (data: TChartItem[], index: number | undefined) => {
  return data
    .map((item, currentIndex) => [
      {
        name: item.name,
        data: item.value.map((value) => roundValue(value)),
        color: item.color,
        hidden: index !== undefined ? currentIndex !== index : false,
      },
    ])
    .flat()
    .filter((item) => item.data.every((dataItem) => dataItem > 0));
};

type TChartData = {
  data: TChartItem[];
  categories: TDateString[] | string[];
  unit: string;
  height: number;
};

export const StackedBarChart = ({ data, categories, unit, height }: TChartData) => {
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState<number | undefined>(undefined);
  const allSeries = useMemo(() => mapToChartSeries(data, currentSeriesIndex), [data, currentSeriesIndex]);
  const barChartSeries = useMemo(() => allSeries.filter((item) => !item.hidden), [allSeries]);

  const changeSeries = useCallback(
    (newIndex: number | undefined) => {
      setCurrentSeriesIndex(newIndex === currentSeriesIndex ? undefined : newIndex);
    },
    [currentSeriesIndex]
  );

  useEffect(() => {
    setCurrentSeriesIndex(undefined);
  }, [data]);

  if (currentSeriesIndex !== undefined) {
    return (
      <BarChart
        series={barChartSeries}
        allSeriesItems={allSeries}
        categories={categories}
        color={allSeries[currentSeriesIndex].color}
        unit={unit}
        height={height}
        onLegendClick={changeSeries}
      />
    );
  }

  return (
    <StackBarChart
      series={allSeries}
      categories={categories}
      unit={unit}
      height={height}
      onLegendClick={changeSeries}
    />
  );
};

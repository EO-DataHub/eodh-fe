import { TDateString } from '@ukri/shared/utils/date';
import { useCallback, useMemo, useState } from 'react';

import { Legend } from './legend.component';
import { TSeriesItem } from './range-area-chart.model';
import { RangeAreaWithLineOneSeriesChart } from './range-area-with-line-one-series-chart.component';

export type TChartItem = {
  min: number | null;
  max: number | null;
  median: number | null;
  timestamp: TDateString | string;
};

type TSeries = {
  title: string;
  data: TChartItem[];
  color: string;
};

const mapToChartSeries = (series: Record<string, TSeries>, index: number) => {
  return Object.values(series).map(
    (seriesItem, currentIndex: number): TSeriesItem => ({
      title: seriesItem.title,
      color: seriesItem.color,
      hidden: currentIndex !== index,
      data: seriesItem.data.map((item) => ({
        min: parseFloat(parseFloat((item.min || 0).toString()).toFixed(2)),
        max: parseFloat(parseFloat((item.max || 0).toString()).toFixed(2)),
        median: parseFloat(parseFloat((item.median || 0).toString()).toFixed(2)),
        timestamp: item.timestamp,
      })),
    })
  );
};

type TRangeAreaWithLineMultipleChartProps = {
  series: Record<string, TSeries>;
  height: number;
};

export const RangeAreaWithLineMultipleSeriesChart = ({ series, height }: TRangeAreaWithLineMultipleChartProps) => {
  const [currentSeriesIndex, setCurrentSeriesIndex] = useState<number>(0);
  const chartSeries = useMemo(() => mapToChartSeries(series, currentSeriesIndex), [series, currentSeriesIndex]);

  const changeSeries = useCallback(
    (newIndex: number | undefined) => {
      setCurrentSeriesIndex(newIndex === currentSeriesIndex ? 0 : newIndex || 0);
    },
    [currentSeriesIndex]
  );

  return (
    <div className='relative'>
      <Legend series={chartSeries} index={currentSeriesIndex} onLegendItemClick={changeSeries} />
      <RangeAreaWithLineOneSeriesChart series={chartSeries} height={height} />
    </div>
  );
};

import { TDateString } from '@ukri/shared/utils/date';
import { useCallback, useMemo, useState } from 'react';

import { AssetSwitcher } from './asset-switcher.component';
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
  unit: string;
};

const mapToChartSeries = (series: Record<string, TSeries>, assetName?: string) => {
  return Object.entries(series).map(
    ([asset, seriesItem], index): TSeriesItem => ({
      assetName: asset,
      title: seriesItem.title,
      color: seriesItem.color,
      hidden: assetName !== undefined ? assetName !== asset : index > 0,
      unit: seriesItem.unit,
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
  const [currentSeriesName, setCurrentSeriesName] = useState<string | undefined>(
    () =>
      mapToChartSeries(series)
        .filter((item) => !item.hidden)
        .pop()?.assetName
  );
  const chartSeries = useMemo(() => mapToChartSeries(series, currentSeriesName), [series, currentSeriesName]);

  const changeSeries = useCallback((assetName: string | undefined) => {
    setCurrentSeriesName(assetName);
  }, []);

  return (
    <div className='relative'>
      <AssetSwitcher series={chartSeries} value={currentSeriesName} onChange={changeSeries} />
      <RangeAreaWithLineOneSeriesChart series={chartSeries} height={height} />
    </div>
  );
};

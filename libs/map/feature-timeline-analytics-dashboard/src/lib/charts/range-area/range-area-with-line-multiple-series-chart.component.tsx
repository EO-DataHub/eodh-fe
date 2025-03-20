import { TRangeAreaWithLine } from '@ukri/map/data-access-stac-catalog';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { AssetSwitcher } from './asset-switcher.component';
import { getSeriesName, mapToChartSeries, mapToSeries } from './range-area-chart.model';
import { RangeAreaWithLineOneSeriesChart } from './range-area-with-line-one-series-chart.component';

type TRangeAreaWithLineMultipleChartProps = {
  id: string | undefined;
  features: TRangeAreaWithLine[];
  height: number;
};

export const RangeAreaWithLineMultipleSeriesChart = memo(
  ({ id, features, height }: TRangeAreaWithLineMultipleChartProps) => {
    const series = useMemo(() => mapToSeries(features), [features]);
    const [currentSeriesName, setCurrentSeriesName] = useState<string | undefined>(getSeriesName(series));
    const allChartSeries = useMemo(() => mapToChartSeries(series, currentSeriesName), [series, currentSeriesName]);
    const currentChartSeries = useMemo(() => allChartSeries.filter((item) => !item.hidden), [allChartSeries]);
    const [currentId, setCurrentId] = useState(id);

    const changeSeries = useCallback((assetName: string | undefined) => {
      setCurrentSeriesName(assetName);
    }, []);

    useEffect(() => {
      if (id !== currentId) {
        setCurrentSeriesName(getSeriesName(series));
        setCurrentId(id);
      }
    }, [currentId, id, series]);

    return (
      <div className='relative'>
        <AssetSwitcher series={allChartSeries} value={currentSeriesName} onChange={changeSeries} />
        <RangeAreaWithLineOneSeriesChart
          series={currentChartSeries}
          selectedAssetName={currentSeriesName}
          height={height}
        />
      </div>
    );
  }
);

import { TStackBar } from '@ukri/map/data-access-stac-catalog';
import uniq from 'lodash/uniq';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { BarChart } from './bar-chart.component';
import { mapToChartSeries } from './bar-chart.model';
import { StackBarChart } from './stack-bar-chart.component';

type TChartData = {
  id: string | undefined;
  features: TStackBar[];
  height: number;
};

const unit = 'sq km';

export const StackedBarChart = ({ id, features, height }: TChartData) => {
  const [currentSeriesName, setCurrentSeriesName] = useState<string | undefined>(undefined);
  const categories = useMemo(() => uniq(features.map((feature) => feature.properties.datetime)), [features]);
  const color = useMemo(
    () =>
      features
        .map((feature) => [...feature.assets.data['classification:classes']].map((item) => item['color-hint']))
        .flat()
        .pop(),
    [features]
  );
  const allSeries = useMemo(() => mapToChartSeries(features, currentSeriesName), [features, currentSeriesName]);
  const barChartSeries = useMemo(() => allSeries.filter((item) => !item.hidden), [allSeries]);
  const [currentId, setCurrentId] = useState(id);

  const changeSeries = useCallback(
    (newSeriesName: string | undefined) => {
      setCurrentSeriesName(newSeriesName === currentSeriesName ? undefined : newSeriesName);
    },
    [currentSeriesName]
  );

  useEffect(() => {
    if (id !== currentId) {
      setCurrentSeriesName(undefined);
      setCurrentId(id);
    }
  }, [currentId, id]);

  if (currentSeriesName !== undefined) {
    return (
      <BarChart
        series={barChartSeries}
        allSeriesItems={allSeries}
        categories={categories}
        color={color}
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

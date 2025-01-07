import { useMode, useResults } from '@ukri/map/data-access-map';
import { useGraphSearch } from '@ukri/map/data-access-stac-catalog';

import { ChartLoader } from './chart-loader.component';
import { RangeAreaWithLineMultipleSeriesChart } from './charts/range-area/range-area-with-line-multiple-series-chart.component';
import { StackedBarChart } from './charts/stack-bar/stacked-bar-chart.component';

const chartHeight = 160;

export const GraphAnalytics = () => {
  const { searchParams } = useResults();
  const { data, status } = useGraphSearch({ params: searchParams });
  const { mode } = useMode();

  if (mode !== 'action-creator') {
    return null;
  }

  if (status === 'pending') {
    return <ChartLoader height={chartHeight} />;
  }

  switch (data?.chartType) {
    case 'stacked-bar': {
      return (
        <div className='w-full'>
          <StackedBarChart
            data={data.assets.data.data}
            categories={data.assets.data.categories}
            unit={data.assets.data.unit}
            height={chartHeight}
          />
        </div>
      );
    }

    case 'range-area-with-line': {
      return (
        <div className='w-full'>
          <RangeAreaWithLineMultipleSeriesChart series={data.assets} height={chartHeight} />
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

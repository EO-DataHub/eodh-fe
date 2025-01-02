import { useMode, useResults } from '@ukri/map/data-access-map';
import { useGraphSearch } from '@ukri/map/data-access-stac-catalog';

import { RangeAreaWithLineMultipleSeriesChart } from './charts/range-area/range-area-with-line-multiple-series-chart.component';
import { StackedBarChart } from './charts/stack-bar/stacked-bar-chart.component';

const chartHeight = 160;

export const GraphAnalytics = () => {
  const { searchParams } = useResults();
  const { data } = useGraphSearch({ params: searchParams });
  const { mode } = useMode();

  if (mode !== 'action-creator') {
    return null;
  }

  switch (data?.chartType) {
    case 'stacked-bar': {
      return (
        <div className='w-full'>
          <StackedBarChart height={chartHeight} data={data.assets.data.data} categories={data.assets.data.categories} />
        </div>
      );
    }

    case 'range-area-with-line': {
      return (
        <div className='w-full'>
          <RangeAreaWithLineMultipleSeriesChart height={chartHeight} series={data.assets} />
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

import { useComparisonMode, useMode, useResults } from '@ukri/map/data-access-map';
import { useGraphSearch } from '@ukri/map/data-access-stac-catalog';
import { Error, Icon } from '@ukri/shared/design-system';

import { ChartLoader } from './charts/chart-loader.component';
import { RangeAreaWithLineMultipleSeriesChart } from './charts/range-area/range-area-with-line-multiple-series-chart.component';
import { StackedBarChart } from './charts/stack-bar/stacked-bar-chart.component';

const chartHeight = 160;

export const GraphAnalytics = () => {
  const { searchParams } = useResults();
  const { data, status } = useGraphSearch({ params: searchParams });
  const { mode } = useMode();
  const { comparisonModeEnabled } = useComparisonMode();

  if (mode !== 'action-creator' || comparisonModeEnabled) {
    return null;
  }

  if (status === 'pending') {
    return <ChartLoader height={chartHeight} />;
  }

  if (status === 'error' || !data || !Object.entries(data.assets).length) {
    return (
      <div className='w-full'>
        <Error
          icon={<Icon name='Warning' width={48} height={48} className='mr-1.5 mb-4 text-error-main' />}
          title='MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.ERRORS.NO_RESULTS.TITLE'
          message='MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.ERRORS.NO_RESULTS.MESSAGE'
        />
      </div>
    );
  }

  switch (data.chartType) {
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

import { useComparisonMode, useMode, useResults } from '@ukri/map/data-access-map';
import { TRangeAreaWithLineChartData, TStackBarChartData, useGraphSearch } from '@ukri/map/data-access-stac-catalog';
import { Error, Icon } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { ChartLoader } from './charts/chart-loader.component';
import { RangeAreaWithLineMultipleSeriesChart } from './charts/range-area/range-area-with-line-multiple-series-chart.component';
import { StackedBarChart } from './charts/stack-bar/stacked-bar-chart.component';

const chartHeight = 160;

export const GraphAnalytics = () => {
  const { searchParams } = useResults();
  const { data, status } = useGraphSearch({ params: searchParams });
  const { mode } = useMode();
  const { comparisonModeEnabled } = useComparisonMode();
  const chartType = useMemo(() => [...(data?.pages || [])]?.pop()?.chartType, [data?.pages]);
  const assets = useMemo(() => data?.pages.map((item) => item.assets).flat() || [], [data?.pages]);

  if (mode !== 'action-creator' || comparisonModeEnabled) {
    return null;
  }

  if (status === 'pending') {
    return <ChartLoader height={chartHeight} />;
  }

  if (status === 'error' || !data || !Object.entries(assets).length) {
    return (
      <div className='w-full'>
        <Error
          icon={<Icon name='Warning' width={48} height={48} className='mb-4 text-error-main' />}
          title='MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.ERRORS.NO_RESULTS.TITLE'
          message='MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.ERRORS.NO_RESULTS.MESSAGE'
        />
      </div>
    );
  }

  switch (chartType) {
    case 'stacked-bar': {
      return (
        <div className='w-full'>
          <StackedBarChart
            data={(assets as unknown as TStackBarChartData['assets']).data.data}
            categories={(assets as unknown as TStackBarChartData['assets']).data.categories}
            unit={(assets as unknown as TStackBarChartData['assets']).data.unit}
            height={chartHeight}
          />
        </div>
      );
    }

    case 'range-area-with-line': {
      return (
        <div className='w-full'>
          <RangeAreaWithLineMultipleSeriesChart
            series={assets as unknown as TRangeAreaWithLineChartData['assets']}
            height={chartHeight}
          />
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

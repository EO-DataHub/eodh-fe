import { useComparisonMode, useMode, useResults } from '@ukri/map/data-access-map';
import {
  getAllPages,
  isRangeAreaWithLineSchema,
  isStackBarSchema,
  useCatalogSearch,
} from '@ukri/map/data-access-stac-catalog';
import { Error, Icon } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { ChartLoader } from './charts/chart-loader.component';
import { RangeAreaWithLineMultipleSeriesChart } from './charts/range-area/range-area-with-line-multiple-series-chart.component';
import { StackedBarChart } from './charts/stack-bar/stacked-bar-chart.component';

const chartHeight = 160;

export const GraphAnalytics = () => {
  const { searchParams } = useResults();
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { mode } = useMode();
  const { comparisonModeEnabled } = useComparisonMode();
  const allPages = useMemo(() => getAllPages(data), [data]);

  if (mode !== 'action-creator' || comparisonModeEnabled) {
    return null;
  }

  if (status === 'pending') {
    return <ChartLoader height={chartHeight} />;
  }

  if (status === 'error' || !data || !allPages?.features.length) {
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

  if (isStackBarSchema(allPages)) {
    return (
      <div className='w-full'>
        <StackedBarChart id={searchParams?.id} features={allPages.features} height={chartHeight} />
      </div>
    );
  }

  if (isRangeAreaWithLineSchema(allPages)) {
    return (
      <div className='w-full'>
        <RangeAreaWithLineMultipleSeriesChart id={searchParams?.id} features={allPages.features} height={chartHeight} />
      </div>
    );
  }

  return null;
};

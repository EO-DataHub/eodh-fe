import { createDateString, formatDateTime } from '@ukri/shared/utils/date';
import { renderToString } from 'react-dom/server';

import { IParsedSeriesData, renderTooltip } from '../tooltip.component';
import { roundValue } from '../utils';
import { IApexOptions, TSeriesItem } from './range-area-chart.model';

export const createTooltip =
  (series: TSeriesItem[], selectedAssetName: string | undefined) =>
  ({ seriesIndex, dataPointIndex, w }: IApexOptions) => {
    const dateInMilliseconds = w.globals.seriesX[seriesIndex][dataPointIndex];
    const color = [...w.globals.colors].pop();
    const name = series.find((item) => item.assetName === selectedAssetName)?.title || '';
    const unit = series.find((item) => item.assetName === selectedAssetName)?.unit || '';

    let items = series.reduce<IParsedSeriesData[]>((acc, item) => {
      if (!item) {
        return acc;
      }
      const value = item.data[dataPointIndex];

      if (!value) {
        return acc;
      }

      return [
        ...acc,
        {
          translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.RANGE_AREA.TOOLTIP.MEDIAN',
          displayedValue: `${roundValue(value.median || 0).toString()} ${unit}`,
        },
        {
          translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.RANGE_AREA.TOOLTIP.MIN',
          displayedValue: `${roundValue(value.min || 0).toString()} ${unit}`,
        },
        {
          translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.RANGE_AREA.TOOLTIP.MAX',
          displayedValue: `${roundValue(value.max || 0).toString()} ${unit}`,
        },
      ];
    }, []);

    items = [
      ...items,
      {
        translationKey: 'MAP.TIMELINE_ANALYTICS_DASHBOARD.CHARTS.RANGE_AREA.TOOLTIP.DATE',
        displayedValue: formatDateTime(createDateString(new Date(dateInMilliseconds)), 'YYYY-MM-DD', 'HH:mm:ss.mmm'),
      },
    ];

    return renderToString(renderTooltip({ items, name, color: color || '' }));
  };

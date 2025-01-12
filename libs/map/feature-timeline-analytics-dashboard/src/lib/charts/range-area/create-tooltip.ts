import { createDateString, formatDate } from '@ukri/shared/utils/date';
import { renderToString } from 'react-dom/server';

import { roundValue } from '../stack-bar/utils';
import { IParsedSeriesData, renderTooltip } from '../tooltip.component';
import { IApexOptions, TSeriesItem } from './range-area-chart.model';

export const createTooltip =
  (series: TSeriesItem[], selectedAssetName: string | undefined) =>
  ({ series: chartSeries, seriesIndex, dataPointIndex, w }: IApexOptions) => {
    const dateInMilliseconds = w.globals.seriesX[seriesIndex][dataPointIndex];
    const pointConfig = w.globals.initialSeries[seriesIndex];
    const name = series.find((item) => item.assetName === selectedAssetName)?.title || '';
    const unit = series.find((item) => item.assetName === selectedAssetName)?.unit || '';

    let items = chartSeries?.reduce<IParsedSeriesData[]>((acc, item, index) => {
      if (!item) {
        return acc;
      }

      const value = item[dataPointIndex];
      const pointConfig = w.globals.initialSeries[index];

      if (pointConfig.hidden) {
        return acc;
      }

      return value || value === 0
        ? [
            ...acc,
            {
              name: pointConfig.name || '',
              displayedValue: `${roundValue(value).toString()} ${unit}`,
            },
          ]
        : acc;
    }, []);

    items = [
      ...items,
      {
        name: 'Date',
        displayedValue: formatDate(createDateString(new Date(dateInMilliseconds))),
      },
    ];

    return renderToString(renderTooltip({ items, name, color: pointConfig.color }));
  };

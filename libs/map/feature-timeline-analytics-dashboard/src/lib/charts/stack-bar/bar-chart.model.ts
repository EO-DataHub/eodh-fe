import { TStackBar } from '@ukri/map/data-access-stac-catalog';
import { ApexOptions } from 'apexcharts';
import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';

import { roundValue } from '../utils';

export type TChartItem = {
  name: string;
  data: number[];
  color: string;
  datetime: string;
  hidden: boolean;
};

interface IApexGlobals {
  globals: {
    seriesX: TChartItem['data'][];
    seriesPercent: TChartItem['data'][];
    colors: string[];
    initialSeries: {
      name: string;
      color: string;
      type: string;
      group: string;
      data: { x: number; y: number | null }[];
    }[];
  };
}

export interface IApexOptions {
  series: TChartItem['data'][];
  seriesIndex: number;
  dataPointIndex: number;
  w: IApexGlobals;
}

export const defaultOptions: ApexOptions = {
  fill: {
    opacity: 1,
  },
  legend: {
    show: false,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 5,
    },
  },
  dataLabels: {
    enabled: false,
  },
};

export const mapToChartSeries = (features: TStackBar[], seriesName: string | undefined): TChartItem[] => {
  const items = features
    .map((feature) =>
      feature.assets.data['classification:classes'].map((item) => {
        const index = item.value;
        let value = index !== null ? feature.properties.lulc_classes_m2[index] : 0;

        if (value && value > 0) {
          value = value / 1000000;
        }

        return {
          name: item.description,
          data: [value],
          color: item['color-hint'],
          datetime: feature.properties.datetime,
        };
      })
    )
    .flat();
  const itemsByName = Object.entries(groupBy(items, (item) => item.datetime))
    .map(([datetime, items]) =>
      items.reduce(
        (acc, val): Record<string, Omit<TChartItem, 'hidden'>> => ({
          ...acc,
          [val.name]: {
            name: acc[val.name]?.name ? acc[val.name].name : val.name,
            data: [sum([...(acc[val.name]?.data || []), ...val.data])],
            color: acc[val.name]?.color ? acc[val.name].color : val.color,
            datetime,
          },
        }),
        {} as Record<string, Omit<TChartItem, 'hidden'>>
      )
    )
    .map((item) => Object.values(item))
    .flat()
    .reduce(
      (acc, val): Record<string, Omit<TChartItem, 'hidden'>> => ({
        ...acc,
        [val.name]: {
          name: acc[val.name]?.name ? acc[val.name].name : val.name,
          data: [...(acc[val.name]?.data || []), ...val.data],
          color: acc[val.name]?.color ? acc[val.name].color : val.color,
          datetime: acc[val.name]?.datetime ? acc[val.name].datetime : val.datetime,
        },
      }),
      {} as Record<string, Omit<TChartItem, 'hidden'>>
    );

  return Object.values(itemsByName)
    .filter((item) => item.data.some((dataItem) => dataItem > 0))
    .map((item) => [
      {
        name: item.name,
        data: item.data.map((value) => roundValue(value)),
        color: item.color,
        datetime: item.datetime,
        hidden: seriesName !== undefined ? seriesName !== item.name : false,
      },
    ])
    .flat();
};

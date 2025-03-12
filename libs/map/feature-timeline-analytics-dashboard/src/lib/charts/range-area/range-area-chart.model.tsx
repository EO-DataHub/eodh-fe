import { TRangeAreaWithLine } from '@ukri/map/data-access-stac-catalog';
import { TDateString } from '@ukri/shared/utils/date';

import { roundValue } from '../utils';

export type TChartItem = {
  min: number | undefined | null;
  max: number | undefined | null;
  median: number | undefined | null;
  timestamp: TDateString | string;
};

type TSeries = {
  title: string;
  data: TChartItem[];
  color: string;
  unit: string;
};

export type TSeriesItem = {
  assetName: string;
  title: string;
  data: TChartItem[];
  color: string;
  unit: string;
  hidden: boolean;
};

interface IApexGlobals {
  globals: {
    seriesX: number[][];
    colors: string[];
    seriesRange: {
      x: number;
      y: { y1: number; y2: number; rangeName: string }[];
    }[][];
    initialSeries: {
      name: string;
      color: string;
      type: string;
      group: string;
      hidden: boolean;
      data: { x: number; y: number | null }[];
    }[];
  };
}

export interface IApexOptions {
  series: number[][];
  seriesIndex: number;
  dataPointIndex: number;
  w: IApexGlobals;
}

type TRangeAreaWithLineAssetName = keyof Omit<TRangeAreaWithLine['assets'], 'thumbnail'>;
type TRangeAreaWithLineAsset = Required<TRangeAreaWithLine['assets']>[TRangeAreaWithLineAssetName];

const colorMap = {
  ndvi: '#008000',
  evi: '#15b01a',
  savi: '#9acd32',
  data: '#d4526e',
  doc: '#13eac9',
  cdom: '#7bc8f6',
  cya_cells: '#00008b',
  cya_mg: '#da70d6',
  chl_a_coastal: '#ffa500',
  chl_a_low: '#f97306',
  chl_a_high: '#daa520',
  ndwi: '#9a0eea',
  turb: '#6e750e',
  unknown: '#000000',
};

export const mapToChartSeries = (series: Record<string, TSeries>, assetName?: string) => {
  return Object.entries(series).map(
    ([asset, seriesItem], index): TSeriesItem => ({
      assetName: asset,
      title: seriesItem.title,
      color: seriesItem.color,
      hidden: assetName !== undefined ? assetName !== asset : index > 0,
      unit: seriesItem.unit,
      data: seriesItem.data.map((item) => ({
        min: roundValue(item.min),
        max: roundValue(item.max),
        median: roundValue(item.median),
        timestamp: item.timestamp,
      })),
    })
  );
};

export const mapToSeries = (features: TRangeAreaWithLine[]) => {
  return features
    .map((feature) =>
      Object.entries(feature.assets)
        .filter((asset): asset is [TRangeAreaWithLineAssetName, TRangeAreaWithLineAsset] => asset[0] !== 'thumbnail')
        .map(([assetName, asset]) => ({
          name: assetName,
          title: asset.title,
          color: colorMap[assetName],
          unit: asset.colormap.units,
          data: {
            min: asset?.statistics.minimum,
            max: asset?.statistics.maximum,
            median: asset?.statistics.median,
            timestamp: feature.properties.datetime,
          },
        }))
    )
    .flat()
    .reduce(
      (acc, val): Record<string, TSeries> => ({
        ...acc,
        [val.name]: {
          title: acc[val.name]?.title ? acc[val.name].title : val.title,
          color: acc[val.name]?.color ? acc[val.name].color : val.color,
          unit: acc[val.name]?.unit ? acc[val.name].unit : val.unit,
          data: [...(acc[val.name]?.data || []), val.data],
        },
      }),
      {} as Record<string, TSeries>
    );
};

export const getSeriesName = (series: Record<string, TSeries>) =>
  mapToChartSeries(series)
    .filter((item) => !item.hidden)
    .pop()?.assetName;

import { TDateString } from '@ukri/shared/utils/date';

export type TChartItem = {
  min: number;
  max: number;
  median: number;
  timestamp: TDateString | string;
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

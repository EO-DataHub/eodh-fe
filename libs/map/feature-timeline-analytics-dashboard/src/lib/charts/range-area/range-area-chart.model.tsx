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

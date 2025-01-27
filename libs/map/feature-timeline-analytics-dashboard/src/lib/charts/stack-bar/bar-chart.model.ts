import { ApexOptions } from 'apexcharts';

export type TChartItem = {
  name: string;
  data: number[];
  color: string;
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

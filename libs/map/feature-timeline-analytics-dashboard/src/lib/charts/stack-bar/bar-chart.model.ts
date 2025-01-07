import { ApexOptions } from 'apexcharts';

export type TChartItem = {
  name: string;
  data: number[];
  color: string;
  hidden: boolean;
};

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
      left: 0,
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        total: {
          enabled: false,
          offsetX: 0,
          style: {
            fontSize: '13px',
            fontWeight: 900,
          },
        },
      },
    },
  },
};

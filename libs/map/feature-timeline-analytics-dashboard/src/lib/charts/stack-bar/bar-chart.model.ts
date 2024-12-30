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
    show: true,
    position: 'top',
    onItemClick: {
      toggleDataSeries: true,
    },
    onItemHover: {
      highlightDataSeries: true,
    },
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
      // horizontal: true,
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

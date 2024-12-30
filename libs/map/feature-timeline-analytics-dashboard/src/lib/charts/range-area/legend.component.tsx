import { TSeriesItem } from './range-area-chart.model';

type TLegendProps = {
  series: TSeriesItem[];
  index: number;
  onLegendItemClick: (index: number) => void;
};

export const Legend = ({ series, onLegendItemClick }: TLegendProps) => {
  return (
    <div className='apexcharts-legend apexcharts-align-center apx-legend-position-top max-h-20'>
      {series.map((seriesItem, currentIndex) => (
        <div
          className={`apexcharts-legend-series m-1 cursor-pointer ${
            seriesItem.hidden ? 'apexcharts-inactive-legend' : ''
          }`}
          key={seriesItem.title}
          onClick={() => onLegendItemClick(currentIndex)}
        >
          <span className='apexcharts-legend-marker h-4 w-4 left-0 top-0'>
            <span className='rounded-full w-full h-full' style={{ backgroundColor: seriesItem.color }}></span>
          </span>
          <span className='apexcharts-legend-text'>{seriesItem.title}</span>
        </div>
      ))}
    </div>
  );
};

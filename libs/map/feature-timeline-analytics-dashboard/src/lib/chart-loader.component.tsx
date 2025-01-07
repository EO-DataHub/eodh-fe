import { LoadingSpinner } from '@ukri/shared/design-system';

type TChartLoaderProps = {
  height: number;
};

export const ChartLoader = ({ height }: TChartLoaderProps) => {
  return (
    <div className='w-full flex items-start justify-center' style={{ height }}>
      <LoadingSpinner size='lg' />
    </div>
  );
};

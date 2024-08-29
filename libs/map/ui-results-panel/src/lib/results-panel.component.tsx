import { Button } from '@ukri/shared/design-system';

interface IResultsPanelProps {
  results: any;
  error: any;
  loading: boolean;
}

export const ResultsPanel = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto pb-4'>aaa</div>
      <div className='mt-auto shadow-data-range-picker p-4'>aaa</div>
    </div>
  );
};

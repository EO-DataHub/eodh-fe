import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { Tree } from './tree/tree.component';

export const SearchPanel = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>
        <Tree />
      </div>
      <div className='mt-auto'>
        <DateRangePicker />
      </div>
    </div>
  );
};

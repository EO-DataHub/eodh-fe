import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { Tree } from './tree/tree.component';

export const SearchPanel = () => {
  return (
    <div className='h-full'>
      <Tree />
      <DateRangePicker />
    </div>
  );
};

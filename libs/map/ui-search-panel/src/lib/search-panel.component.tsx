import { Button } from '@ukri/shared/design-system';

import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { Tree } from './tree/tree.component';

const minDate = new Date('1972-01-01');
const today = new Date();

export const SearchPanel = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>
        <Tree />
      </div>
      <div className='mt-auto shadow-data-range-picker p-4'>
        <DateRangePicker maxDate={today} minDate={minDate} />
        <Button text='MAP.DATE_RANGE_PICKER.SEARCH' className='w-full flex justify-center mt-0' size='large' />
      </div>
    </div>
  );
};

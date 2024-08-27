import { Button } from '@ukri/shared/design-system';

import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import useDateCalculations from './date-range-picker/dates-calculations.hook';
import { Tree } from './tree/tree.component';

const minDate = '1972-01-01';

export const SearchPanel = () => {
  const { formattedToday } = useDateCalculations();
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>
        <Tree />
      </div>
      <div className='mt-auto shadow-data-range-picker p-4'>
        <DateRangePicker maxDate={formattedToday} minDate={minDate} />
        <Button text='MAP.DATE_RANGE_PICKER.SEARCH' className='w-full flex justify-center mt-0' size='large' />
      </div>
    </div>
  );
};

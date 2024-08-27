import { Button } from '@ukri/shared/design-system';

import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { Tree } from './tree/tree.component';

export const SearchPanel = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 overflow-y-auto'>
        <Tree />
      </div>
      <div className='mt-auto shadow-data-range-picker p-4'>
        <DateRangePicker />
        <Button text='Search' className='w-full flex justify-center mt-0' size='large' />
      </div>
    </div>
  );
};

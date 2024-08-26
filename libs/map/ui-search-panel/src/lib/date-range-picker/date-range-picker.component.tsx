import { DateInput } from '@ukri/shared/design-system';
import { Text } from '@ukri/shared/design-system';
import { useState } from 'react';

export const DateRangePicker = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='p-4 shadow-data-range-picker'>
      <div className='flex justify-between items-center cursor-pointer' onClick={toggleOpen}>
        <Text
          content='MAP.DATE_RANGE_PICKER.TITLE'
          type='h2'
          fontSize='large'
          fontWeight='bold'
          className='text-text'
        />
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <div className='mt-4'>
          <div className='mb-2'>
            <label className='block text-gray-700'>Search from:</label>
            <DateInput />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Search to:</label>
            <DateInput />
          </div>
          <button className='w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500'>Search</button>
        </div>
      )}
    </div>
  );
};

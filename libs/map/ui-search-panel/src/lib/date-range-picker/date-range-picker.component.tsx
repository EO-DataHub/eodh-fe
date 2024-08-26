import { Button, DateInput, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

type TDateString = `${number}-${number}-${number}`;

const minDate = '1972-01-01';

export const DateRangePicker = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [fromDate, setFromDate] = useState<TDateString | null>(null);
  const [toDate, setToDate] = useState<TDateString | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const handleFromDateChange = useCallback(
    (date: TDateString) => {
      setFromDate(date);
      if (toDate && date > toDate) {
        setToDate(null);
      }
    },
    [toDate]
  );

  const handleToDateChange = useCallback(
    (date: TDateString) => {
      setToDate(date);
      if (fromDate && date < fromDate) {
        setFromDate(null);
      }
    },
    [fromDate]
  );

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
        <Icon
          name='ArrowDown'
          width={24}
          height={24}
          className={`text-neutral-light transform transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </div>
      {isOpen && (
        <div className='mt-4'>
          <div className='flex justify-between items-center mb-2'>
            <Text
              content='MAP.DATE_RANGE_PICKER.SEARCH_FROM'
              type='h3'
              fontSize='medium'
              fontWeight='regular'
              className='text-text-primary w-24'
            />
            <DateInput
              className='w-60'
              minDate={minDate}
              maxDate={toDate || today}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className='flex justify-between items-center mb-4'>
            <Text
              content='MAP.DATE_RANGE_PICKER.SEARCH_TO'
              type='h3'
              fontSize='medium'
              fontWeight='regular'
              className='text-text-primary w-24'
            />
            <DateInput
              className='w-60'
              minDate={fromDate || minDate}
              maxDate={today}
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
          <Button text='Search' className='w-full flex justify-center' size='large' />
        </div>
      )}
    </div>
  );
};

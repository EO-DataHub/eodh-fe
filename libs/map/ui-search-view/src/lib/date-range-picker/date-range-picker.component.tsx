import { DateInput, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { styles } from './date-range-picker.styles';
import useDateCalculations from './dates-calculations.hook';

interface IDateRangePickerProps {
  minDate: Date;
  maxDate: Date;
}

const isDateAfterToDate = (date: Date, toDate?: Date) => {
  return toDate && date > toDate;
};

const isDateBeforeFromDate = (date: Date, fromDate?: Date) => {
  return fromDate && date < fromDate;
};

export const DateRangePicker = ({ minDate, maxDate }: IDateRangePickerProps) => {
  const { today, formattedOneMonthAgo } = useDateCalculations();

  const [isOpen, setIsOpen] = useState(true);
  const [fromDate, setFromDate] = useState<Date | undefined>(formattedOneMonthAgo);
  const [toDate, setToDate] = useState<Date | undefined>(today);

  const handleFromDateChange = useCallback(
    (date: Date) => {
      setFromDate(date);
      if (isDateAfterToDate(date, toDate)) {
        setToDate(undefined);
      }
    },
    [toDate]
  );

  const handleToDateChange = useCallback(
    (date: Date) => {
      setToDate(date);
      if (isDateBeforeFromDate(date, fromDate)) {
        setFromDate(undefined);
      }
    },
    [fromDate]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleOpen}>
        <Text
          content='MAP.DATE_RANGE_PICKER.TITLE'
          type='h2'
          fontSize='large'
          fontWeight='bold'
          className={styles.textTitle}
        />
        <Icon name='ArrowDown' width={24} height={24} className={`${styles.icon} ${isOpen ? '' : 'rotate-180'}`} />
      </div>
      {isOpen && (
        <div className={styles.content}>
          <div className={`${styles.row} ${styles.rowMarginFrom}`}>
            <Text
              content='MAP.DATE_RANGE_PICKER.SEARCH_FROM'
              type='h3'
              fontSize='medium'
              fontWeight='regular'
              className={styles.textLabel}
            />
            <DateInput
              className={styles.dateInput}
              minDate={minDate}
              maxDate={toDate || maxDate}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className={styles.row}>
            <Text
              content='MAP.DATE_RANGE_PICKER.SEARCH_TO'
              type='h3'
              fontSize='medium'
              fontWeight='regular'
              className={styles.textLabel}
            />
            <DateInput
              className={styles.dateInput}
              minDate={fromDate || minDate}
              maxDate={maxDate}
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

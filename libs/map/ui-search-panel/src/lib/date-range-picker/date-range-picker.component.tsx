import { Button, DateInput, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { styles } from './date-range-picker.styles';

const minDate = '1972-01-01';

export const DateRangePicker = () => {
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);
  const formattedOneMonthAgo = oneMonthAgo.toISOString().split('T')[0];

  const [isOpen, setIsOpen] = useState(true);
  const [fromDate, setFromDate] = useState<string | undefined>(formattedOneMonthAgo);
  const [toDate, setToDate] = useState<string | undefined>(formattedToday);

  const handleFromDateChange = useCallback(
    (date: string) => {
      setFromDate(date);
      if (toDate && date > toDate) {
        setToDate(undefined);
      }
    },
    [toDate]
  );

  const handleToDateChange = useCallback(
    (date: string) => {
      setToDate(date);
      if (fromDate && date < fromDate) {
        setFromDate(undefined);
      }
    },
    [fromDate]
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
              maxDate={toDate || formattedToday}
              value={fromDate}
              onChange={handleFromDateChange}
            />
          </div>
          <div className={`${styles.row} ${styles.rowMarginTo}`}>
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
              maxDate={formattedToday}
              value={toDate}
              onChange={handleToDateChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

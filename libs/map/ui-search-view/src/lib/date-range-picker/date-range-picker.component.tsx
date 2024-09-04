import { DateInput, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TForm } from '../tree/form.model';
import { styles } from './date-range-picker.styles';

interface IDateRangePickerProps {
  minDate: Date;
  maxDate: Date;
}

const dateFromFieldName = 'date.from';
const dateToFieldName = 'date.to';

export const DateRangePicker = ({ minDate, maxDate }: IDateRangePickerProps) => {
  const { register, getValues } = useFormContext<TForm>();
  const [isOpen, setIsOpen] = useState(true);
  const fromDate = getValues('date.from');
  const toDate = getValues('date.from');

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
              {...register(dateFromFieldName)}
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
              {...register(dateToFieldName)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

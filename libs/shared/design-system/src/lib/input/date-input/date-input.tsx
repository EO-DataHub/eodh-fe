import './date-input.css';

import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import { Icon } from '../../icon/icon';
import { dateInputStyles } from './date-input.styles';

function formatDateToString(date?: Date): string {
  if (!date) {
    return '';
  }
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return '';
}

interface IDateInputProps {
  value?: Date;
  onChange?: (value: Date) => void;
  className?: string;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const DateInput: React.FC<IDateInputProps> = ({ value, onChange, className, minDate, maxDate, error }) => {
  const formattedMinDate = formatDateToString(minDate);
  const formattedMaxDate = formatDateToString(maxDate);
  const formattedValue = formatDateToString(value);
  const [inputValue, setInputValue] = useState(formattedValue || '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        const selectedDate = new Date(e.target.value);
        onChange(selectedDate);
      }
    },
    [onChange]
  );

  return (
    <div>
      {error && <span className={dateInputStyles.errorText}>{error}</span>}
      <div className={clsx(dateInputStyles.container, className)}>
        <input
          type='date'
          className={clsx('design-system__date-input', dateInputStyles.input(!!error))}
          value={inputValue}
          onChange={handleChange}
          min={formattedMinDate}
          max={formattedMaxDate}
        />
        <Icon name='Calendar' width={16} height={16} className={dateInputStyles.icon} />
      </div>
    </div>
  );
};

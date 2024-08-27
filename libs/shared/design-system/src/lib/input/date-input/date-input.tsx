import './date-input.css';

import clsx from 'clsx';
import React, { useCallback, useState } from 'react';

import { Icon } from '../../icon/icon';
import { dateInputStyles } from './date-input.styles';

interface IDateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
  minDate?: string;
  maxDate?: string;
}

export const DateInput: React.FC<IDateInputProps> = ({ value, onChange, className, minDate, maxDate, error }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (onChange) {
        onChange(e.target.value);
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
          min={minDate}
          max={maxDate}
        />
        <Icon name='Calendar' width={16} height={16} className={dateInputStyles.icon} />
      </div>
    </div>
  );
};

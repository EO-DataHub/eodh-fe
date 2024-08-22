import './date-input.css';

import clsx from 'clsx';
import React, { useState } from 'react';

import { Icon } from '../../icon/icon';
import { dateInputStyles } from './date-input.styles';

interface IDateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export const DateInput: React.FC<IDateInputProps> = ({ value, onChange, className, error }) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {error && <span className={dateInputStyles.errorText}>{error}</span>}
      <div className={clsx(dateInputStyles.container, className)}>
        <input
          type='date'
          className={clsx('design-system__date-input', dateInputStyles.input(!!error))}
          value={inputValue}
          onChange={handleChange}
        />
        <Icon name='Calendar' width={24} height={24} className={dateInputStyles.icon} />
      </div>
    </div>
  );
};

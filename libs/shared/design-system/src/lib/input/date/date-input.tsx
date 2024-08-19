import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { textInputStyles } from './date-input.styles';

interface IDateInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
}

export const DateInput: React.FC<IDateInputProps> = ({
  value,
  onChange,
  className,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {error && <span className={textInputStyles.errorText}>{error}</span>}
      <div className={clsx(textInputStyles.container, className)}>
        
        <input
          type='date'
          className={textInputStyles.input(!!error)}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

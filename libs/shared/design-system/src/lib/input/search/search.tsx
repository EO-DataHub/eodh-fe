import clsx from 'clsx';
import { FC, useState } from 'react';

import { Icon } from '../../icon/icon';
import * as IconsNames from '../../icon/icons/index';
import { searchInputStyles } from './search.styles';

interface ITextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  clearButton?: boolean;
  iconName?: keyof typeof IconsNames;
  iconWidth?: number;
  iconHeight?: number;
  error?: string;
}

export const SearchInput: FC<ITextInputProps> = ({
  placeholder = 'Start typing...',
  value,
  onChange,
  className,
  clearButton = true,
  iconName,
  iconWidth,
  iconHeight,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      {error && <span className={searchInputStyles.errorText}>{error}</span>}
      <div className={clsx(searchInputStyles.container(!!error), className)}>
        {iconName && (
          <Icon
            name={iconName}
            width={iconWidth ? iconWidth : 18}
            height={iconHeight ? iconHeight : 18}
            className={searchInputStyles.icon}
          />
        )}
        <input
          type='text'
          className={searchInputStyles.input}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        {clearButton && (
          <button className={searchInputStyles.clearButton} onClick={handleClear}>
            <Icon name='Close' />
          </button>
        )}
      </div>
    </div>
  );
};

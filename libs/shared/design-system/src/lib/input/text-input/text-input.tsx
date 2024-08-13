import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../icon/icon';
import * as IconsNames from '../../icon/icons/index';
import { textInputStyles } from './text-input.styles';

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

export const TextInput: React.FC<ITextInputProps> = ({
  placeholder = 'GLOBAL.DESIGN_SYSTEM.TEXTINPUT.PLACEHOLDER',
  value,
  onChange,
  className,
  clearButton = false,
  iconName,
  iconWidth,
  iconHeight,
  error
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const { t } = useTranslation();

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
      {error && <span className={textInputStyles.errorText}>{error}</span>}
      <div className={clsx(textInputStyles.container(!!error), className)}>
        {iconName && (
          <Icon
            name={iconName}
            width={iconWidth ? iconWidth : 18}
            height={iconHeight ? iconHeight : 18}
            className={textInputStyles.icon}
          />
        )}
        <input
          type='text'
          className={textInputStyles.input}
          placeholder={t(placeholder)}
          value={inputValue}
          onChange={handleChange}
        />
        {clearButton && (
          <button
            className={textInputStyles.clearButton}
            onClick={handleClear}
          >
            <Icon name='Close' />
          </button>
        )}
      </div>
    </div>
  );
};
import clsx from 'clsx';
import { useState } from 'react';

import { Icon } from '../../icon/icon';
import * as IconsNames from '../../icon/icons/index';

interface ITextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  clearButton?: boolean;
  iconName?: keyof typeof IconsNames;
  iconWidth?: number;
  iconHeight?: number;
}

export const TextInput: React.FC<ITextInputProps> = ({
  placeholder = 'Start typing...',
  value,
  onChange,
  className,
  clearButton = true,
  iconName,
  iconWidth,
  iconHeight,
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
    <div className={clsx('flex items-center border rounded p-2 bg-bright h-10', className)}>
      {iconName && (
        <Icon
          name={iconName}
          width={iconWidth ? iconWidth : 18}
          height={iconHeight ? iconHeight : 18}
          className='text-neutral-dark'
        />
      )}
      <input
        type='text'
        className='flex-grow px-2 py-1 text-main focus:outline-none'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {clearButton && (
        <button
          className='w-7 h-7 text-neutral-light focus:outline-none flex justify-center items-center'
          onClick={handleClear}
        >
          <Icon name='Close' />
        </button>
      )}
    </div>
  );
};

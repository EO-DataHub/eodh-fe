import { Icon } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const searchInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container:
    'flex items-center border rounded p-1.5 bg-bright h-7 focus-within:ring-1 focus-within:ring-primary-light focus-within:border-primary-light border-bright-dark',
  icon: 'text-neutral-dark',
  input:
    'flex-grow px-2 py-1 text-action-creator-body text-text whitespace-nowrap overflow-hidden text-ellipsis outline-none w-[calc(100%-16px)] caret-transparent cursor-default',
  clearButton: 'text-neutral-light focus:outline-none flex justify-center items-center',
};

interface INodeInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  iconName?: 'Polygon' | 'Circle' | 'Satellite' | 'Square';
}

export const NodeInput: React.FC<INodeInputProps> = ({ value, onChange, className, iconName }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleClear = () => {
    setInputValue('');
    if (onChange) {
      onChange('');
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      <div className={clsx(searchInputStyles.container, className)}>
        {iconName && <Icon name={iconName} width={12} height={12} className={searchInputStyles.icon} />}
        <input type='text' className={searchInputStyles.input} value={inputValue} />
        <button className={searchInputStyles.clearButton} onClick={handleClear}>
          <Icon name='Close' width={16} height={16} />
        </button>
      </div>
    </div>
  );
};

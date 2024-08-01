import { useRef, useState } from 'react';

import { Icon } from '../icon/icon';
import { selectStyles } from './select.styles';

interface IOption {
  value: string;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  onChange: (option: IOption | null) => void;
  placeholder?: string;
}

export const Select = ({ options, onChange, placeholder = 'Select an option' }: ISelectProps) => {
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleChange = (selectedOptionValue: IOption) => {
    setSelectedOption(selectedOptionValue);
    setIsOpen(false);
    onChange(selectedOptionValue);
  };

  return (
    <div className={selectStyles.container} ref={ref}>
      <div className='relative'>
        <button
          type='button'
          className={selectStyles.button}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-labelledby='listbox-label'
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectStyles.buttonText(!selectedOption)}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={selectStyles.iconContainer}>
            <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
          </span>
        </button>
      </div>

      {isOpen && (
        <ul className={selectStyles.list} tabIndex='-1' role='listbox' aria-labelledby='listbox-label'>
          {options.map((option, index) => (
            <li
              key={index}
              className={selectStyles.listItem(selectedOption?.value === option.value)}
              id={`listbox-option-${index}`}
              role='option'
              aria-selected={selectedOption?.value === option.value}
              onClick={() => handleChange(option)}
            >
              <span className={selectStyles.listItemText(selectedOption?.value === option.value)}>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

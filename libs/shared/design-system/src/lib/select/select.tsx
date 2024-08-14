import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  error?: string;
}

export const Select = ({
  options,
  onChange,
  placeholder = 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER',
  error,
}: ISelectProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleChange = useCallback(
    (selectedOptionValue: IOption) => {
      setSelectedOption(selectedOptionValue);
      setIsOpen(false);
      onChange(selectedOptionValue);
    },
    [onChange]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <div className={selectStyles.container} ref={ref}>
      {error && <span className={selectStyles.errorMessage}>{error}</span>}
      <div className='relative'>
        <button className={selectStyles.button(error)} aria-expanded={isOpen} onClick={handleToggle}>
          <span className={selectStyles.buttonText(!selectedOption)}>
            {selectedOption ? selectedOption.label : t(placeholder)}
          </span>
          <span className={selectStyles.iconContainer}>
            <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
          </span>
        </button>
      </div>

      {isOpen && (
        <ul className={selectStyles.list} role='listbox' aria-labelledby='listbox-label'>
          {options.map((option, index) => (
            <li
              key={option.value}
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

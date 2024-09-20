import clsx from 'clsx';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../icon/icon';
import { selectStyles } from './select.styles';

type TOptionValue = string | undefined;

interface IOption {
  value: TOptionValue;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  onChange: (option: IOption | null) => void;
  placeholder?: ParseKeys;
  error?: string;
  className?: string;
  value?: string;
}

export const Select = ({
  options,
  onChange,
  placeholder = 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER',
  error,
  className,
  value,
}: ISelectProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<IOption | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value));
  }, [value, options]);

  const handleChange = useCallback(
    (selectedOptionValue: IOption) => {
      setIsOpen(false);
      setSelectedOption(selectedOptionValue);
      onChange(selectedOptionValue);
    },
    [onChange]
  );

  const handleToggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return (
    <div className={clsx(selectStyles.container, className)} ref={ref}>
      {error && <span className={selectStyles.errorMessage}>{error}</span>}
      <div className={selectStyles.selectWrapper(error)}>
        {!isOpen && (
          <div className={selectStyles.button} aria-expanded={isOpen} onClick={handleToggle}>
            <span className={selectStyles.buttonText}>{selectedOption ? selectedOption.label : t(placeholder)}</span>
            <span className={selectStyles.iconContainer}>
              <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
            </span>
          </div>
        )}

        {isOpen && (
          <ul
            className={selectStyles.list}
            role='listbox'
            aria-labelledby='listbox-label'
            aria-expanded={isOpen}
            // onClick={handleToggle}
          >
            <li
              key='placeholder'
              className={selectStyles.listItem(selectedOption?.value === null)}
              id={`listbox-option-placeholder`}
              role='option'
              aria-selected={selectedOption?.value === null}
              onClick={() => handleChange({ value: undefined, label: t(placeholder) })}
            >
              <span className={selectStyles.listItemText(selectedOption?.value === null)}>{t(placeholder)}</span>
              <span className={selectStyles.iconContainer}>
                <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
              </span>
            </li>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={selectStyles.listItem(selectedOption?.value === option.value)}
                id={`listbox-option-${index}`}
                role='option'
                aria-selected={selectedOption?.value === option.value}
                onClick={() => handleChange(option)}
              >
                <span className={selectStyles.listItemText(selectedOption?.value === option.value)}>
                  {t(option.label)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

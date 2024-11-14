import clsx from 'clsx';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useOutsideClick } from '../hooks/use-outside-click';
import { Icon } from '../icon/icon';
import { selectStyles } from './select.styles';

type TOptionValue = string | undefined;

interface IOption {
  value: TOptionValue;
  label: string;
}

interface ISelectProps {
  options: IOption[];
  onChange: (value?: string | null) => void;
  placeholder?: ParseKeys;
  disabled?: boolean;
  error?: string;
  className?: string;
  value?: string;
}

// TODO change it to not connected component once we will work on function handling ticket (UKRIW-94)
export const Select = ({
  options,
  onChange,
  placeholder = 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER',
  error,
  className,
  value,
  disabled,
}: ISelectProps) => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<IOption | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === value));
  }, [value, options]);

  const handleChange = useCallback(
    (selectedOptionValue: IOption) => {
      if (!disabled) {
        setSelectedOption(selectedOptionValue);
        onChange(selectedOptionValue.value);
        setIsOpen(true);
      }
    },
    [disabled, onChange]
  );

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  }, [disabled]);

  return (
    <div className={clsx(selectStyles.container, className)} ref={ref}>
      {error && <span className={selectStyles.errorMessage}>{error}</span>}
      <div className={selectStyles.selectWrapper(error, disabled)} onClick={handleToggle}>
        {!isOpen && (
          <div className={selectStyles.listItem(disabled)}>
            <span className={clsx(selectStyles.buttonText, selectStyles.listItemText)}>
              {selectedOption ? selectedOption.label : t(placeholder)}
            </span>
            {!disabled && (
              <span className={selectStyles.iconContainer}>
                <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
              </span>
            )}
          </div>
        )}

        {isOpen && (
          <ul className={selectStyles.list} role='listbox' aria-labelledby='listbox-label' aria-expanded={isOpen}>
            <li
              key='placeholder'
              className={selectStyles.listItem(disabled)}
              id={`listbox-option-placeholder`}
              role='option'
              aria-selected={selectedOption?.value === null}
            >
              <span
                className={selectStyles.listItemText}
                onClick={() => handleChange({ value: undefined, label: t(placeholder) })}
              >
                {t(placeholder)}
              </span>
              <span className={selectStyles.iconContainer}>
                <Icon name='ArrowDown' className={selectStyles.icon(isOpen)} />
              </span>
            </li>
            {options.map((option, index) => (
              <li
                key={option.value}
                className={selectStyles.listItem(disabled)}
                id={`listbox-option-${index}`}
                role='option'
                aria-selected={selectedOption?.value === option.value}
                onClick={() => handleChange(option)}
              >
                <p className={selectStyles.listItemText}>{t(option.label)}</p>
                {selectedOption?.value === option.value && <Icon name='Check' className={selectStyles.checkedValue} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

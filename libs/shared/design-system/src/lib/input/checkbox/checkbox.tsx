import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useState } from 'react';

import { Icon } from '../../icon/icon';
import { checkboxStyles, getSpanClassName } from './checkbox.styles';

interface ICheckboxProps {
  id?: string;
  name: string;
  value?: string;
  initialChecked?: boolean | undefined;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const Checkbox = forwardRef(
  (
    { id, initialChecked = false, disabled, onChange, label, name, value }: ICheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isChecked, setIsChecked] = useState(initialChecked);
    const spanClassName = getSpanClassName(isChecked, disabled);

    const handleCheckboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(!isChecked);
        if (onChange) {
          onChange(event);
        }
      },
      [isChecked, onChange]
    );

    return (
      <label className={checkboxStyles.label}>
        <input
          ref={ref}
          type='checkbox'
          className={checkboxStyles.input}
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={disabled}
          value={value}
          id={id}
          name={name}
        />
        <span className={spanClassName}>
          {isChecked && !disabled && <Icon name='Check' />}
          {disabled && <Icon name='Remove' />}
        </span>
        <span className={checkboxStyles.text}>{label}</span>
      </label>
    );
  }
);

import { ChangeEvent, useState } from 'react';

import { Icon } from '../../icon/icon';
import { checkboxStyles, getSpanClassName } from './checkbox.styles';

interface ICheckboxProps {
  id?: string;
  name: string;
  value?: boolean;
  initialChecked?: boolean | undefined;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const Checkbox = ({ id, initialChecked, disabled, onChange, label, name }: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const spanClassName = getSpanClassName(isChecked, disabled);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className={checkboxStyles.label}>
      <input
        type='checkbox'
        className={checkboxStyles.input}
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
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
};

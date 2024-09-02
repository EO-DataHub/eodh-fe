import { ChangeEvent, ForwardedRef, forwardRef, useCallback } from 'react';

import { Icon } from '../../icon/icon';
import { checkboxStyles, getSpanClassName } from './checkbox.styles';

interface ICheckboxProps {
  id?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  state?: 'error' | null;
  disabled?: boolean;
}

export const Checkbox = forwardRef(
  ({ id, onChange, onBlur, label, name, state, disabled }: ICheckboxProps, ref: ForwardedRef<HTMLInputElement>) => {
    const spanClassName = getSpanClassName();

    const handleCheckboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
      },
      [onChange]
    );

    return (
      <label className={checkboxStyles.label}>
        <input
          ref={ref}
          type='checkbox'
          className={checkboxStyles.input(state)}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={handleCheckboxChange}
          disabled={disabled}
        />
        <span className={spanClassName}>
          <Icon name='Check' />
          <Icon name='Remove' />
        </span>
        <span className={checkboxStyles.text}>{label}</span>
      </label>
    );
  }
);

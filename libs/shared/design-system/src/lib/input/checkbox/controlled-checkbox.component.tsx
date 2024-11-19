import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Checkbox, ICheckboxProps } from './checkbox';

interface IControlledCheckboxProps extends Omit<ICheckboxProps, 'onChange' | 'onBlur'> {
  value?: boolean;
  onChange?: (value: boolean) => void;
  onBlur?: (value: boolean) => void;
}

export const ControlledCheckbox = ({
  id,
  label,
  name,
  value,
  state,
  disabled,
  onChange,
  onBlur,
  className = '',
  icon = 'Check',
}: IControlledCheckboxProps) => {
  const [internalValue, setInternalValue] = useState<boolean | undefined>(value);
  const innerRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.checked;

      setInternalValue(value);

      if (onChange) {
        onChange(value);
      }
    },
    [onChange, setInternalValue]
  );

  const handleBlur = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = !!event.target.value;

      setInternalValue(value);

      if (onBlur) {
        onBlur(value);
      }
    },
    [onBlur, setInternalValue]
  );

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.checked = !!internalValue;
    }
  }, [innerRef, internalValue]);

  useEffect(() => {
    setInternalValue(value);
  }, [value, setInternalValue]);

  return (
    <Checkbox
      ref={innerRef}
      id={id}
      name={name}
      label={label}
      state={state}
      disabled={disabled}
      className={className}
      icon={icon}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

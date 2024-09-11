import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

import { Icon } from '../../icon/icon';
import { Text } from '../../text/text';
import { checkboxStyles, getSpanClassName } from './checkbox.styles';

interface ICheckboxProps {
  id?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  state?: 'error' | null;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = forwardRef(
  (
    { id, onChange, onBlur, label, name, state, disabled, className = '' }: ICheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const spanClassName = getSpanClassName();

    return (
      <label className={`${checkboxStyles.label} ${className}`}>
        <input
          ref={ref}
          type='checkbox'
          className={checkboxStyles.input(state)}
          id={id}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
        />
        <span className={spanClassName}>
          <Icon name='Check' />
          <Icon name='Remove' />
        </span>
        {label && (
          <Text content={label} type='p' fontSize='medium' fontWeight='regular' className={checkboxStyles.text} />
        )}
      </label>
    );
  }
);

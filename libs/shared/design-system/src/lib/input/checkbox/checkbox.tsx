import isString from 'lodash/isString';
import { ChangeEvent, ForwardedRef, forwardRef, ReactNode } from 'react';

import { Icon, TIconNames } from '../../icon/icon';
import { Text } from '../../text/text';
import { checkboxStyles, getSpanClassName } from './checkbox.styles';

const isIcon = (icon: TIconNames | ReactNode | undefined): icon is TIconNames => isString(icon);

type TCheckboxIconProps = { icon: TIconNames | ReactNode | undefined };

const CheckboxIcon = ({ icon }: TCheckboxIconProps) => {
  if (!icon) {
    return null;
  }

  if (isIcon(icon)) {
    return <Icon name={icon} />;
  }

  return icon;
};

interface ICheckboxProps {
  id?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  state?: 'error' | null;
  disabled?: boolean;
  className?: string;
  icon?: TIconNames | ReactNode;
}

export const Checkbox = forwardRef(
  (
    { id, onChange, onBlur, label, name, state, disabled, className = '', icon = 'Check' }: ICheckboxProps,
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
          <CheckboxIcon icon={icon} />
        </span>
        {label && (
          <Text content={label} type='p' fontSize='medium' fontWeight='regular' className={checkboxStyles.text} />
        )}
      </label>
    );
  }
);

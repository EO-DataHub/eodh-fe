import isString from 'lodash/isString';
import { useMemo } from 'react';

import { twMerge } from '../../merge.tailwind';
import { getRadioBtnStyles, radioButtonStyles } from './radio-button.styles';

interface IRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | JSX.Element;
  className?: string;
}

export const RadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
  label: labelOrLabelCmp,
  className,
}: IRadioButtonProps) => {
  const radioBtnStyles = getRadioBtnStyles(checked);
  const label = useMemo((): JSX.Element | null => {
    if (!labelOrLabelCmp) {
      return null;
    }

    if (isString(labelOrLabelCmp)) {
      return <span className={radioButtonStyles.labelText}>{label}</span>;
    }

    return labelOrLabelCmp;
  }, [labelOrLabelCmp]);

  return (
    <label htmlFor={id} className={twMerge(radioButtonStyles.label, className)}>
      <input
        type='radio'
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={radioButtonStyles.input}
      />
      <div className={radioBtnStyles}>{checked && <div className={radioButtonStyles.indicator}></div>}</div>
      {label}
    </label>
  );
};

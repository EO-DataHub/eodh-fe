import isString from 'lodash/isString';

import { twMerge } from '../../merge.tailwind';
import { getRadioBtnStyles, radioButtonStyles } from './radio-button.styles';

interface ILabelProps {
  content: string | JSX.Element;
}

const Label = ({ content }: ILabelProps) => {
  if (!content) {
    return null;
  }

  if (isString(content)) {
    return <span className={radioButtonStyles.labelText}>{content}</span>;
  }

  return content;
};

interface IRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | JSX.Element;
  className?: string;
}

export const RadioButton = ({ id, name, value, checked, onChange, label, className }: IRadioButtonProps) => {
  const radioBtnStyles = getRadioBtnStyles(checked);

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
      <Label content={label} />
    </label>
  );
};

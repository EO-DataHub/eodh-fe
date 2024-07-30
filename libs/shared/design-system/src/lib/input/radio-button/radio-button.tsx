import { getRadioBtnStyles, radioButtonStyles } from './radio-button.styles';

interface IRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const RadioButton = ({ id, name, value, checked, onChange, label }: IRadioButtonProps) => {
  const radioBtnStyles = getRadioBtnStyles(checked);

  return (
    <label htmlFor={id} className={radioButtonStyles.label}>
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
      {label && <span className={radioButtonStyles.labelText}>{label}</span>}
    </label>
  );
};

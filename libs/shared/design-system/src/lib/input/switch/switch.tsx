import isString from 'lodash/isString';
import { ReactNode } from 'react';

import { Text } from '../../text/text';
import {
  getBackgroundClasses,
  getCircleClasses,
  getLabelClasses,
  getLabelTextClasses,
  switchStyles,
} from './switch.styles';

interface ILabelProps {
  checked: boolean;
  label?: string | ReactNode;
  disabled?: boolean;
}

const Label = ({ label, checked, disabled }: ILabelProps) => {
  const labelTextClasses = getLabelTextClasses(checked, disabled);

  if (!label) {
    return null;
  }

  if (isString(label)) {
    return <Text className={labelTextClasses} content={label} type='p' fontSize='medium' fontWeight='regular' />;
  }

  return label;
};

interface ISwitchProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  labelDisabled?: string | ReactNode;
  labelEnabled?: string | ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Switch = ({
  id,
  checked = false,
  onChange,
  labelDisabled,
  labelEnabled,
  disabled,
  className = '',
}: ISwitchProps) => {
  const labelClasses = `${getLabelClasses(disabled)} ${className}`;
  const backgroundClasses = getBackgroundClasses(disabled);
  const circleClasses = getCircleClasses(checked, disabled);

  const handleChange = () => {
    if (disabled) {
      return;
    }

    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <label htmlFor={id} className={labelClasses}>
      <Label label={labelDisabled} checked={!checked} disabled={disabled} />
      <div className='relative'>
        <input type='checkbox' id={id} checked={checked} onChange={handleChange} className={switchStyles.input} />
        <div className={backgroundClasses}>
          <div className={circleClasses}></div>
        </div>
      </div>
      <Label label={labelEnabled} checked={checked} disabled={disabled} />
    </label>
  );
};

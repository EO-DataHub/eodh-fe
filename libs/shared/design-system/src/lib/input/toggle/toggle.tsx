import { useState } from 'react';

import { Text } from '../../text/text';
import { getBackgroundClasses, getCircleClasses, toggleStyles } from './toggle.styles';

interface IToggleProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle = ({
  id,
  checked: initialChecked = false,
  onChange,
  label,
  disabled,
  className = '',
}: IToggleProps) => {
  const [checked, setChecked] = useState(initialChecked);
  const backgroundClasses = getBackgroundClasses(disabled);
  const circleClasses = getCircleClasses(disabled, checked);

  const handleChange = () => {
    if (disabled) {
      return;
    }
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label htmlFor={id} className={`${toggleStyles.label} ${className}`}>
      <div className='relative'>
        <input type='checkbox' id={id} checked={checked} onChange={handleChange} className={toggleStyles.input} />
        <div className={backgroundClasses}>
          <div className={circleClasses}></div>
        </div>
      </div>
      {label && (
        <Text
          className={toggleStyles.labelText(checked)}
          content={label}
          type='p'
          fontSize='large'
          fontWeight='semibold'
        />
      )}
    </label>
  );
};

import React, { useState } from 'react';

interface IToggleProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle = ({ id, checked: initialChecked = false, onChange, label, disabled }: IToggleProps) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  const toggleBackgroundClasses = `w-[28px] h-[18px] bg-bright rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer peer-checked:bg-blue-600 border border-1 border-primary ${
    disabled && 'cursor-not-allowed bg-bright-dark border-text-disabled'
  }`;

  const toggleCircleClasses = `absolute top-[4px] left-[4px] rounded-full h-[10px] w-[10px] transition-all  ${
    disabled ? 'bg-neutral-light' : ' bg-primary-main'
  } ${checked && 'translate-x-full'}`;

  return (
    <label htmlFor={id} className='flex items-center cursor-pointer'>
      <div className='relative'>
        <input type='checkbox' id={id} checked={checked} onChange={handleChange} className='sr-only' />
        <div className={toggleBackgroundClasses}>
          <div className={toggleCircleClasses}></div>
        </div>
      </div>
      {label && <span className='ml-3 text-sm font-medium text-text'>{label}</span>}
    </label>
  );
};

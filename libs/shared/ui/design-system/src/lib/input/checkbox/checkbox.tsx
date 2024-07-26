import React, { useState } from 'react';

interface ICheckboxProps {
  id: string;
  name: string;
  value: string;
  initialChecked?: boolean | undefined;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export const Checkbox = ({ id, initialChecked, disabled, onChange, label, name, value }: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <label className='flex items-center relative cursor-pointer select-none mb-3'>
      <input
        type='checkbox'
        className='absolute opacity-0 cursor-pointer h-0 w-0'
        checked={isChecked}
        onChange={handleCheckboxChange}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
      />
      <span
        className={`w-4 h-4 flex items-center justify-center mr-2 border-1 rounded-sm transition-colors duration-200 ease-in-out ${
          disabled
            ? 'bg-neutral-light border-neutral-light'
            : isChecked
            ? 'bg-primary border-primary'
            : 'bg-bright-mid border-bright-dark'
        }`}
      >
        {isChecked && !disabled && (
          <svg
            className='w-3.5 h-3.5 text-bright'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
          </svg>
        )}
        {disabled && (
          <svg width='10' height='2' viewBox='0 0 10 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M0.25 1.54166V0.458328H9.75V1.54166H0.25Z' fill='white' />
          </svg>
        )}
      </span>
      <span className='text-text-primary'>{label}</span>
    </label>
  );
};

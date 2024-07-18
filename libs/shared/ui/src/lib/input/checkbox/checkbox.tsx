import React, { useState } from 'react';

export interface ICheckboxProps {
  id: string;
  initialChecked?: boolean | undefined;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox = ({ id, initialChecked, disabled, onChange, label }: ICheckboxProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange({ target: { checked: !isChecked, id } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <label className='flex items-center relative cursor-pointer select-none mb-3'>
      <input
        type='checkbox'
        className='absolute opacity-0 cursor-pointer h-0 w-0'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span
        className={`w-[18px] h-[18px] flex items-center justify-center mr-2 border-1 rounded-sm transition-colors duration-200 ease-in-out ${
          isChecked ? 'bg-primary border-primary' : 'bg-bright-mid border-bright-dark'
        } ${disabled ? 'bg-neutral-light border-neutral-light' : ''}`}
      >
        {isChecked && !disabled && (
          <svg
            className='w-[15px] h-[15px] text-white'
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
      <span className='text-lg'>{label}</span>
    </label>
  );
};

export default Checkbox;

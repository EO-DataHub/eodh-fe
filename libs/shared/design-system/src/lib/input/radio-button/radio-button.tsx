import React from 'react';

interface IRadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const RadioButton = ({ id, name, value, checked, onChange, label }: IRadioButtonProps) => {
  const radioBtnBaseStyles = `w-[18px] h-[18px] flex items-center justify-center border-1 border border-solid rounded-full bg-bright-mid border-bright-dark ${
    checked && 'border-primary-main bg-bright'
  }`;
  return (
    <label htmlFor={id} className='flex items-center cursor-pointer'>
      <input type='radio' id={id} name={name} value={value} checked={checked} onChange={onChange} className='sr-only' />
      <div className={radioBtnBaseStyles}>{checked && <div className='w-2.5 h-2.5 bg-primary rounded-full'></div>}</div>
      {label && <span className='ml-2'>{label}</span>}
    </label>
  );
};

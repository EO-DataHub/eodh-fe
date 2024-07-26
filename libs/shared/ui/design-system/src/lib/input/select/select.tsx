// src/components/Select.js
import React from 'react';

interface ISelectProps {
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  placeholder?: string;
}

const Select = ({ options, onChange, value, placeholder = 'Select a function...' }: ISelectProps) => {
  return (
    <div className='relative inline-block w-full'>
      <select
        className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        value={value}
        onChange={onChange}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
        <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
        </svg>
      </div>
    </div>
  );
};

export default Select;

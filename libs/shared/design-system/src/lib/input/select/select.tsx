// THIS COMPONENT WILL BE FINISHED IN NEXT PR
import { Icon } from '../../icon/icon';

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
        className='block appearance-none w-full bg-bright border border-bright-dark hover:border-bright-mid px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
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
      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text'>
        <Icon name='ArrowDown' />
      </div>
    </div>
  );
};

export default Select;

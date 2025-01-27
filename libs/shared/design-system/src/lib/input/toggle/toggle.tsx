import { Text } from '../../text/text';
import {
  getBackgroundClasses,
  getCircleClasses,
  getLabelClasses,
  getLabelTextClasses,
  toggleStyles,
} from './toggle.styles';

interface IToggleProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const Toggle = ({ id, checked = false, onChange, label, disabled, className = '' }: IToggleProps) => {
  const labelClasses = `${getLabelClasses(disabled)} ${className}`;
  const labelTextClasses = getLabelTextClasses(checked, disabled);
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
      <div className='relative'>
        <input type='checkbox' id={id} checked={checked} onChange={handleChange} className={toggleStyles.input} />
        <div className={backgroundClasses}>
          <div className={circleClasses}></div>
        </div>
      </div>
      {label && <Text className={labelTextClasses} content={label} type='p' fontSize='large' fontWeight='semibold' />}
    </label>
  );
};

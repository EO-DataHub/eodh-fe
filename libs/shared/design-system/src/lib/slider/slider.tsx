import './slider.css';

import { ChangeEvent, useCallback, useMemo, useState } from 'react';

interface ISliderProps {
  value?: number;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  max?: number | string;
}

export const Slider = ({ name, value = 0, onChange, max = 100 }: ISliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      setSliderValue(value);
      onChange(event);
    },
    [onChange]
  );

  const getBackgroundStyle = useMemo(() => {
    const progress = (sliderValue / parseInt(max?.toString())) * 100;
    return `linear-gradient(to right, var(--colors-primary-main) ${progress}%, var(--colors-meutral-light) ${progress}%)`;
  }, [sliderValue, max]);

  return (
    <div className='flex items-center py-[1px]'>
      <input
        name={name}
        type='range'
        min='0'
        max={max}
        value={sliderValue}
        onChange={handleChange}
        className={`design-system__slider-range-input ${getBackgroundStyle}`}
        style={{ background: getBackgroundStyle }}
      />
      <div className='text-neutral-dark text-medium pl-2 w-12 text-right'>{sliderValue}%</div>
    </div>
  );
};

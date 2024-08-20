import './slider.css';

import React, { useMemo, useState } from 'react';

interface ISliderProps {
  value?: number;
  onChange: (value: number) => void;
  max?: number;
}

export const Slider = ({ value = 0, onChange, max = 100 }: ISliderProps) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSliderValue(value);
    onChange(value);
  };

  const getBackgroundStyle = useMemo(() => {
    const progress = (sliderValue / max) * 100;
    // return `bg-gradient-to-r 'primary-main' to-${progress}% neutral-light from-${progress}%`;
    return `linear-gradient(to right, #4483FF ${progress}%, #A3A3A3 ${progress}%)`;
    // return `linear-gradient(to right, theme('colors.primary.main) ${progress}%, theme('colors.neutral.light) ${progress}%)`;
  }, [sliderValue, max]);

  return (
    <div className='flex items-center'>
      <input
        type='range'
        min='0'
        max={max}
        value={sliderValue}
        onChange={(e) => handleChange(e)}
        className={`sliderRangeInput ${getBackgroundStyle}`}
        style={{ background: getBackgroundStyle }}
      />
      <div className='text-neutral-dark text-medium pl-2'>{sliderValue}%</div>
    </div>
  );
};

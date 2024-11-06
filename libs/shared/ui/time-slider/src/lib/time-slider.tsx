import Slider from '@mui/material/Slider';
import {
  dateToNumber,
  getBeginingOfYear,
  getEndYear,
  type TDateString,
  type TDateTimeString,
} from '@ukri/shared/utils/date';
import React, { useMemo, useState } from 'react';

import { CustomLabel, CustomMark, ValueLabelComponent } from './custom-components';
import { sliderStyles } from './time-slider.styles';

interface ITimeSliderProps {
  min: TDateString | TDateTimeString;
  max: TDateString | TDateTimeString;
  initialValues?: [TDateString, TDateString];
  className?: string;
}

export const TimeSlider: React.FC<ITimeSliderProps> = ({ min, max, initialValues = [min, max], className }) => {
  const minNum = getBeginingOfYear(min);
  const maxNum = getEndYear(max);
  const [value, setValue] = useState<number[]>(initialValues.map(dateToNumber) as [number, number]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const marks = useMemo(() => {
    const result = [];
    for (let year = Math.floor(minNum); year <= Math.ceil(maxNum); year++) {
      for (let month = 0; month < 12; month++) {
        const value = year + month / 12;
        if (value >= minNum && value <= maxNum) {
          result.push({ value, label: month === 0 ? `${year}` : '' });
        }
      }
    }
    return result;
  }, [minNum, maxNum]);

  return (
    <div className={`h-[76px] w-full relative bg-background-main ${className}`}>
      <div className='w-full px-[24px] pt-[13px] absolute top-0'>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay='auto'
          min={minNum}
          max={maxNum}
          step={1 / 12}
          marks={marks}
          slots={{
            valueLabel: ValueLabelComponent,
            mark: CustomMark,
            markLabel: CustomLabel,
          }}
          sx={sliderStyles}
        />
      </div>
    </div>
  );
};

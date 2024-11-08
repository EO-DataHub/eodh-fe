import Slider from '@mui/material/Slider';
import {
  dateToNumber,
  getBeginingOfYear,
  getEndYear,
  type TDateString,
  type TDateTimeString,
} from '@ukri/shared/utils/date';
import { useCallback, useMemo, useState } from 'react';

import { CustomLabel, CustomMark, ValueLabelComponent } from './custom-components';
import { sliderStyles } from './time-slider.styles';

const getMarks = (minNum: number, maxNum: number) => {
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
};

interface ITimeSliderProps {
  min: TDateString | TDateTimeString;
  max: TDateString | TDateTimeString;
  initialValues?: [TDateString, TDateString];
  className?: string;
}

export const TimeSlider: React.FC<ITimeSliderProps> = ({ min, max, initialValues = [min, max], className }) => {
  const minNum = getBeginingOfYear(min) ?? undefined;
  const maxNum = getEndYear(max) ?? undefined;
  const [value, setValue] = useState<number[]>(initialValues.map(dateToNumber) as [number, number]);

  const updateSliderValue = useCallback((_: Event, newValue: number | number[]) => {
    setValue(Array.isArray(newValue) ? newValue : [newValue]);
  }, []);

  const marks = useMemo(() => (minNum && maxNum ? getMarks(minNum, maxNum) : []), [minNum, maxNum]);

  return (
    <div className={`${sliderStyles.container} ${className}`}>
      <div className={sliderStyles.innerContainer}>
        <Slider
          value={value}
          onChange={updateSliderValue}
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
          className={sliderStyles.slider}
        />
      </div>
    </div>
  );
};

import Slider from '@mui/material/Slider';
import {
  dateToNumber,
  getBeginingOfYear,
  getEndYear,
  numberToDateString,
  type TDateString,
  type TDateTimeString,
} from '@ukri/shared/utils/date';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

type TDate = TDateString | TDateTimeString;

interface ITimeSliderProps {
  min: TDate;
  max: TDate;
  selectedMin?: TDate;
  selectedMax?: TDate;
  className?: string;
  onUpdate: (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => void;
}

export const TimeSlider = ({
  min,
  max,
  selectedMin = min,
  selectedMax = min,
  onUpdate,
  className,
}: ITimeSliderProps) => {
  const [value, setValue] = useState<number[]>([dateToNumber(selectedMin) ?? 0, dateToNumber(selectedMax) ?? 0]);
  const minNum = getBeginingOfYear(min) ?? undefined;
  const maxNum = getEndYear(max) ?? undefined;

  const updateSliderValue = useCallback(
    (_: Event, newValue: number | number[]) => {
      const updatedValue = Array.isArray(newValue) ? newValue : [newValue];
      const dateFrom = numberToDateString(updatedValue[0]);
      const dateTo = numberToDateString(updatedValue[1], true);

      if (dateFrom && dateTo) {
        onUpdate(dateFrom, dateTo);
      }

      setValue(updatedValue);
    },
    [onUpdate]
  );

  useEffect(() => {
    const dateFrom = value[0];
    const dateTo = value[1];
    const newDateFrom = dateToNumber(min) ?? 0;
    const newDateTo = dateToNumber(max) ?? 0;

    if (newDateFrom !== dateFrom && newDateTo !== dateTo) {
      setValue([newDateFrom, newDateTo]);
    }
  }, [min, max, value]);

  const marks = useMemo(() => (minNum && maxNum ? getMarks(minNum, maxNum) : []), [minNum, maxNum]);

  return (
    <div className={`${sliderStyles.container} ${className}`}>
      <div className={sliderStyles.innerContainer}>
        <Slider
          defaultValue={[dateToNumber(selectedMin) ?? 0, dateToNumber(selectedMax) ?? 0]}
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

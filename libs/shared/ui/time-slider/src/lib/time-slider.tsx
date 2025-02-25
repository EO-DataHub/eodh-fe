import Slider from '@mui/material/Slider';
import {
  dateToNumber,
  getBeginingOfYear,
  getEndYear,
  numberToDateString,
  returnMaxDate,
  returnMinDate,
  type TDate,
  type TDateString,
} from '@ukri/shared/utils/date';
import { useCallback, useMemo } from 'react';

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
  min: TDate;
  max: TDate;
  selectedMin?: TDate;
  selectedMax?: TDate;
  className?: string;
  disabled?: boolean;
  onUpdate: (dateFrom: NonNullable<TDateString>, dateTo: NonNullable<TDateString>) => void;
}

export const TimeSlider = ({
  min,
  max,
  selectedMin = min,
  selectedMax = max,
  onUpdate,
  className,
  disabled,
}: ITimeSliderProps) => {
  const minNum = getBeginingOfYear(min) ?? undefined;
  const maxNum = getEndYear(max) ?? undefined;

  const updateSliderValue = useCallback(
    (_: Event, newValue: number | number[]) => {
      const updatedValue = Array.isArray(newValue) ? newValue : [newValue];
      let minValue = updatedValue[0];
      let maxValue = updatedValue[1];
      minValue = Math.max(minNum ?? 0, Math.min(minValue, maxNum ?? 0));
      maxValue = Math.max(minNum ?? 0, Math.min(maxValue, maxNum ?? 0));
      const dateFrom = returnMinDate(min, numberToDateString(minValue));
      const dateTo = returnMaxDate(max, numberToDateString(maxValue, true));

      if (dateFrom && dateTo) {
        onUpdate(dateFrom, dateTo);
      }
    },
    [onUpdate, minNum, maxNum, max, min]
  );

  const initialSliderValue = useMemo(() => {
    const begining = dateToNumber(selectedMin, 'firstDay') ?? 0;
    const end = dateToNumber(selectedMax, 'lastDay') ?? 0;
    return [begining, end];
  }, [selectedMin, selectedMax]);

  const marks = useMemo(() => (minNum && maxNum ? getMarks(minNum, maxNum) : []), [minNum, maxNum]);

  return (
    <div className={`${sliderStyles.container} ${className}`}>
      <div className={sliderStyles.innerContainer}>
        <Slider
          value={initialSliderValue}
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
          disabled={disabled}
          disableSwap
        />
      </div>
    </div>
  );
};

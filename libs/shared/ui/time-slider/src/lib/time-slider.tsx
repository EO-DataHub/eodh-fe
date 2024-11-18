import Slider from '@mui/material/Slider';
import {
  dateToNumber,
  getBeginingOfYear,
  getEndYear,
  numberToDateString,
  type TDateString,
  type TDateTimeString,
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

type TDate = TDateString | TDateTimeString;

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
      const dateFrom = numberToDateString(updatedValue[0]);
      const dateTo = numberToDateString(updatedValue[1], true);

      if (dateFrom && dateTo) {
        onUpdate(dateFrom, dateTo);
      }
    },
    [onUpdate]
  );

  const marks = useMemo(() => (minNum && maxNum ? getMarks(minNum, maxNum) : []), [minNum, maxNum]);

  return (
    <div className={`${sliderStyles.container} ${className}`}>
      <div className={sliderStyles.innerContainer}>
        <Slider
          value={[dateToNumber(selectedMin, 'firstDay') ?? 0, dateToNumber(selectedMax, 'lastDay') ?? 0]}
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
        />
      </div>
    </div>
  );
};

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

function returnMaxDate(maxDate: TDate, newSelectedMaxDate: TDate) {
  if (!maxDate || !newSelectedMaxDate) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }
  const dateObjA = new Date(maxDate);
  const dateObjB = new Date(newSelectedMaxDate);

  if (dateObjA < dateObjB) {
    return maxDate;
  } else if (dateObjA > dateObjB) {
    return newSelectedMaxDate;
  }
  return maxDate;
}

function returnMinDate(minDate: TDate, newSelectedMinDate: TDate) {
  if (!minDate || !newSelectedMinDate) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }
  const dateObjA = new Date(minDate);
  const dateObjB = new Date(newSelectedMinDate);

  if (dateObjA > dateObjB) {
    return minDate;
  } else if (dateObjA < dateObjB) {
    return newSelectedMinDate;
  }
  return minDate;
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
      const clampedValue = [
        Math.max(minNum ?? 0, Math.min(updatedValue[0], maxNum ?? 0)),
        Math.max(minNum ?? 0, Math.min(updatedValue[1], maxNum ?? 0)),
      ];
      const dateFrom = returnMinDate(min, numberToDateString(clampedValue[0]));
      const dateTo = returnMaxDate(max, numberToDateString(clampedValue[1], true));

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

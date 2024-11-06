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
    setValue(newValue as number[]);
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
          // sx={{
          //   height: 8,
          //   '& .MuiSlider-track': {
          //     border: 'none',
          //     backgroundColor: '#1976d2',
          //     zIndex: 1,
          //   },
          //   '& .MuiSlider-thumb': {
          //     height: 24,
          //     width: 24,
          //     zIndex: 2,
          //     backgroundColor: '#fff',
          //     border: '2px solid currentColor',
          //     '&:hover': {
          //       boxShadow: '0px 0px 0px 8px rgba(25,118,210,0.16)',
          //     },
          //     '& .Mui-active': {
          //       boxShadow: '0px 0px 0px 14px rgba(25,118,210,0.16)',
          //     },
          //   },
          //   '& .MuiSlider-rail': {
          //     opacity: 1,
          //     backgroundColor: '#E7E7E7',
          //   },
          //   '& .MuiSlider-mark': {
          //     backgroundColor: '#D8D8D8',
          //     height: 12,
          //     width: 2,
          //   },
          //   '& .MuiSlider-markLabel': {
          //     color: '#9e9e9e',
          //     fontSize: '12px',
          //   },
          // }}
        />
      </div>
    </div>
  );
};

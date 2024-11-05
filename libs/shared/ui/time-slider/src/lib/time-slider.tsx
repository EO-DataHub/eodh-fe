import { Tooltip } from '@mui/material';
import Slider from '@mui/material/Slider';
import { createDate, dateToNumber, type TDateString, type TDateTimeString } from '@ukri/shared/utils/date';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { sliderStyles } from './time-slider.styles';

const translationPath = 'GLOBAL.DESIGN_SYSTEM.TIME_SLIDER.MONTHS';

const MONTH_KEYS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const ValueLabelComponent: React.FC<{ children: React.ReactElement; value: number }> = ({ children, value }) => {
  const { t } = useTranslation();
  const MONTHS = useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const year = Math.floor(value);
  const monthIndex = Math.round((value - year) * 12);
  return (
    <Tooltip enterTouchDelay={0} placement='top' title={`${MONTHS[monthIndex]} ${year}`}>
      {children}
    </Tooltip>
  );
};

const CustomMark: React.FC<{ 'data-index': number; className: string; style: { right: string } }> = (props) => (
  <div
    className={`absolute bg-bright-dark bottom-0 ${props.className}`}
    style={{
      ...props.style,
      width: 1,
      height: props['data-index'] % 12 === 0 ? 46 : 30,
    }}
  />
);

const CustomLabel: React.FC<{
  'data-index': number;
  className: string;
  ownerState: { min: number; max: number };
  style: { right: string };
  children: React.ReactNode;
}> = (props) => {
  const { t } = useTranslation();
  const MONTHS = useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const month = props.ownerState.max - props.ownerState.min === 1 ? MONTHS[props['data-index']] : '';

  return (
    <div className={props.className} style={{ ...props.style, position: 'absolute', width: 'auto', bottom: '-5px' }}>
      {month && <div className='relative bottom-auto left-1/2 translate-x-1/2'>{month}</div>}
      <div className='absolute -translate-x-1/2'>{props.children}</div>
    </div>
  );
};

interface ITimeSliderProps {
  min: TDateString | TDateTimeString;
  max: TDateString | TDateTimeString;
  initialValues?: [TDateString, TDateString];
  className?: string;
}

export const TimeSlider: React.FC<ITimeSliderProps> = ({ min, max, initialValues = [min, max], className }) => {
  const getEndYear = (date: TDateString): number => {
    const adjustedDate = createDate(date);
    if (adjustedDate && (adjustedDate.getMonth() !== 0 || adjustedDate.getDate() !== 1)) {
      adjustedDate.setFullYear(adjustedDate.getFullYear() + 1);
    }
    adjustedDate?.setMonth(0, 1);
    return dateToNumber(adjustedDate?.toISOString().split('T')[0] as TDateString);
  };

  const getBeginingOfYear = (date: TDateString): number => {
    const adjustedDate = createDate(date);
    adjustedDate?.setMonth(0, 1);
    return dateToNumber(adjustedDate?.toISOString().split('T')[0] as TDateString);
  };

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
      <div className='w-full px-[24px] pb-4 pt-[13px] absolute top-0'>
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

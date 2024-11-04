import { Tooltip } from '@mui/material';
import Slider from '@mui/material/Slider';
import React, { PropsWithChildren, useState } from 'react';

const getMonth = (value: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[value];
};

type TMarkProps = {
  'data-index': number;
  className: string;
  style: {
    right: string;
  };
};

interface IValueLabelComponentProps {
  children: React.ReactElement;
  value: number;
}

const ValueLabelComponent = (props: IValueLabelComponentProps) => {
  const { children, value } = props;

  // Convert value to year and month
  const year = Math.floor(value);
  const monthIndex = Math.round((value - year) * 12);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Tooltip enterTouchDelay={0} placement='top' title={`${months[monthIndex]} ${year}`}>
      {children}
    </Tooltip>
  );
};

function isZeroOrMultipleOf12(number: number) {
  return number === 0 || number % 12 === 0;
}

const CustomMark = (props: TMarkProps) => {
  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        position: 'absolute',
        width: 1,
        height: `${isZeroOrMultipleOf12(props['data-index']) ? 46 : 30}px`,
        background: '#D8D8D8',
        bottom: 0,
      }}
    ></div>
  );
};

type TLabelProps = {
  'data-index': number;
  className: string;
  style: {
    right: string;
  };
};

const CustomLabel = (props: PropsWithChildren<TLabelProps>) => {
  console.log('props', props);

  const month = props.ownerState.max - props.ownerState.min === 1 ? getMonth(props['data-index']) : '';

  return (
    <div
      className={props.className}
      style={{
        ...props.style,
        position: 'absolute',
        width: 'auto',
        bottom: '-20px',
      }}
    >
      {month && <div className='relative bottom-2 left-1/2 translate-x-1/2'>{month}</div>}
      <div className='absolute -translate-x-1/2'>{props.children}</div>
    </div>
  );
};

interface ITimeSliderProps {
  min: number;
  max: number;
}

export const TimeSlider = ({ min, max }: ITimeSliderProps) => {
  const [value, setValue] = useState<number[]>([2017, 2022]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const generateMarks = () => {
    const marks = [];
    for (let year = 2015; year <= 2024; year++) {
      for (let month = 0; month < 12; month++) {
        const value = year + month / 12;
        marks.push({
          value,
          label: month === 0 ? `${year}` : '',
          color: month === 0 ? 'red' : 'green',
          mark: <>AAA</>,
        });
      }
    }
    return marks;
  };

  return (
    <div className='w-full mx-auto p-4'>
      <h2 className='text-lg font-semibold mb-4 text-gray-500'>timeline</h2>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay='auto'
        min={min}
        max={max}
        step={1 / 12}
        marks={generateMarks()}
        slots={{
          valueLabel: ValueLabelComponent,
          mark: CustomMark,
          markLabel: CustomLabel,
        }}
        sx={{
          color: '#1976d2',
          height: 8,

          '& .MuiSlider-track': {
            border: 'none',
            backgroundColor: '#1976d2',
          },
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:hover': {
              boxShadow: '0px 0px 0px 8px rgba(25,118,210,0.16)',
            },
            '& .Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(25,118,210,0.16)',
            },
          },
          '& .MuiSlider-rail': {
            opacity: 1,
            backgroundColor: '#bfbfbf',
          },
          '& .MuiSlider-mark': {
            backgroundColor: '#bfbfbf',
            height: 12,
            width: 2,
          },
          '& .MuiSlider-markLabel': {
            color: '#9e9e9e',
            fontSize: '12px',
          },
        }}
      />
    </div>
  );
};

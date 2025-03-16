import './slider.css';

import throttle from 'lodash/throttle';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Text } from '../text/text';

interface ISliderProps {
  name: string;
  max?: number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Slider = forwardRef(
  ({ name, max = 100, onChange, onBlur, disabled }: ISliderProps, ref: ForwardedRef<HTMLInputElement | undefined>) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const [sliderValue, setSliderValue] = useState(innerRef?.current ? parseInt(innerRef.current.value) : 0);
    const throttledRef = useRef(throttle((cb: () => void) => cb(), 1000));

    useImperativeHandle(ref, () => (innerRef.current ? innerRef.current : undefined));

    const getBackgroundStyle = useMemo(() => {
      const progress = (sliderValue / parseInt(max?.toString())) * 100;
      if (disabled) {
        return `linear-gradient(to right, var(--colors-primary-light) ${progress}%, var(--colors-bright-mid) ${progress}%)`;
      }

      return `linear-gradient(to right, var(--colors-primary-main) ${progress}%, var(--colors-neutral-light) ${progress}%)`;
    }, [sliderValue, max, disabled]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setSliderValue(value);
        throttledRef.current(() => onChange(event));
      },
      [onChange]
    );

    const handleMouseUp = useCallback(() => {
      if (innerRef.current) {
        innerRef.current.blur();
      }
    }, []);

    useEffect(() => {
      setSliderValue(innerRef?.current ? parseInt(innerRef.current.value) : 0);
    }, [innerRef]);

    return (
      <div className='flex items-center py-[5px]'>
        <input
          ref={innerRef}
          name={name}
          type='range'
          min='0'
          max={max}
          onChange={handleChange}
          onBlur={onBlur}
          onMouseUp={handleMouseUp}
          className='design-system__slider-range-input'
          style={{ background: getBackgroundStyle }}
          disabled={disabled}
        />
        <Text
          content={`${sliderValue}%`}
          fontSize='medium'
          fontWeight='regular'
          className={`pl-2 w-10 text-right ${disabled ? 'text-bright-mid' : 'text-neutral-dark'}`}
        />
      </div>
    );
  }
);

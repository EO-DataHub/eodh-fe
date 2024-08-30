import './slider.css';

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

interface ISliderProps {
  name: string;
  max?: number | string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Slider = forwardRef(
  ({ name, max = 100, onChange, onBlur }: ISliderProps, ref: ForwardedRef<HTMLInputElement | undefined>) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const [sliderValue, setSliderValue] = useState(innerRef?.current ? parseInt(innerRef.current.value) : 0);

    useImperativeHandle(ref, () => (innerRef.current ? innerRef.current : undefined));

    const getBackgroundStyle = useMemo(() => {
      const progress = (sliderValue / parseInt(max?.toString())) * 100;
      return `linear-gradient(to right, var(--colors-primary-main) ${progress}%, var(--colors-meutral-light) ${progress}%)`;
    }, [sliderValue, max]);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setSliderValue(value);
        onChange(event);
      },
      [onChange]
    );

    useEffect(() => {
      setSliderValue(innerRef?.current ? parseInt(innerRef.current.value) : 0);
    }, [innerRef]);

    return (
      <div className='flex items-center py-[1px]'>
        <input
          ref={innerRef}
          name={name}
          type='range'
          min='0'
          max={max}
          onChange={handleChange}
          onBlur={onBlur}
          className='design-system__slider-range-input'
          style={{ background: getBackgroundStyle }}
        />
        <div className='text-neutral-dark text-medium pl-2 w-12 text-right'>{sliderValue}%</div>
      </div>
    );
  }
);

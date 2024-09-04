import './date-input.css';

import clsx from 'clsx';
import isString from 'lodash/isString';
import { ChangeEvent, FC, ForwardedRef, forwardRef } from 'react';

import { Icon } from '../../icon/icon';
import { dateInputStyles } from './date-input.styles';

function formatDateToString(date?: Date | string): string {
  if (!date) {
    return '';
  }

  if (isString(date)) {
    return date;
  }

  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  return '';
}

interface IDateInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
  error?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
}

export const DateInput: FC<IDateInputProps> = forwardRef(
  ({ name, className, minDate, maxDate, error, onChange, onBlur }, ref: ForwardedRef<HTMLInputElement>) => {
    const formattedMinDate = formatDateToString(minDate);
    const formattedMaxDate = formatDateToString(maxDate);

    return (
      <div>
        {error && <span className={dateInputStyles.errorText}>{error}</span>}
        <div className={clsx(dateInputStyles.container, className)}>
          <input
            ref={ref}
            type='date'
            name={name}
            className={clsx('design-system__date-input', dateInputStyles.input(!!error))}
            onChange={onChange}
            onBlur={onBlur}
            min={formattedMinDate}
            max={formattedMaxDate}
          />
          <Icon name='Calendar' width={16} height={16} className={dateInputStyles.icon} />
        </div>
      </div>
    );
  }
);

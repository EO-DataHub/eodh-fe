import './date-input.css';

import clsx from 'clsx';
import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { ChangeEvent, ForwardedRef, forwardRef } from 'react';

import { Icon } from '../../icon/icon';
import { Text } from '../../text/text';
import { dateInputStyles } from './date-input.styles';

function formatDateToString(date?: Date | string): string {
  if (!date) {
    return '';
  }

  if (isString(date)) {
    return date;
  }

  if (isNumber(date)) {
    return new Date(date).toISOString().split('T')[0];
  }

  if (isDate(date)) {
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
  disabled?: boolean;
}

export const DateInput = forwardRef(
  (
    { name, className, minDate, maxDate, error, disabled, onChange, onBlur }: IDateInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const formattedMinDate = formatDateToString(minDate);
    const formattedMaxDate = formatDateToString(maxDate);

    return (
      <div>
        {!disabled && error && (
          <Text content={error} fontSize='medium' fontWeight='regular' className={dateInputStyles.errorText} />
        )}
        <div className={clsx(dateInputStyles.container, className)}>
          <input
            ref={ref}
            type='date'
            name={name}
            className={clsx('design-system__date-input', dateInputStyles.input(!disabled && !!error))}
            onChange={onChange}
            onBlur={onBlur}
            min={formattedMinDate}
            max={formattedMaxDate}
            disabled={disabled}
          />
          <Icon name='Calendar' width={16} height={16} className={dateInputStyles.icon} />
        </div>
      </div>
    );
  }
);

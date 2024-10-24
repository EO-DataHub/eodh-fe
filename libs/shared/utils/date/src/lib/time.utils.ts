import { createDate } from './date.utils';
import { TDateStringInternal, TDateTimeString } from './date.utils';

export type THourFormat = 'HH:mm';

const checkValidHourStr = (str: string): str is TDateStringInternal => {
  if (str.match(/^\d{2}:\d{2}$/) !== null) {
    return true;
  }

  return false;
};

export const formatHour = (date: TDateTimeString, format: THourFormat = 'HH:mm') => {
  if (!date) {
    return null;
  }
  let hourString = '';

  switch (format) {
    case 'HH:mm': {
      const dateFormatted = createDate(date);
      if (!dateFormatted) {
        return null;
      }
      hourString = `${dateFormatted.getHours().toString().padStart(2, '0')}:${dateFormatted
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      break;
    }
  }

  if (checkValidHourStr(hourString)) {
    return hourString;
  }

  // eslint-disable-next-line no-console
  console.error(`[DATE UTILS] Invalid date string: ${date}`);
  return null;
};

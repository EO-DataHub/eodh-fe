import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

enum DATE {}

export type TDateStringInternal = string & { __TYPE__: DATE };

export type TDateInternal = string & { __TYPE__: DATE };

export type TDateTimeString = TDateStringInternal | null;

export type TDateString = TDateInternal | null;

export type TDateFormat = 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'DD-MM-YY';

export const defaultDateFormat = 'YYYY-MM-DD';

export const dateToNumber = (date: TDateTimeString | TDateString, type: 'firstDay' | 'lastDay'): number | null => {
  const d = createDate(date);
  if (d === null) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  const dateWithFirstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const dateWithLastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  const newDate = type === 'firstDay' ? dateWithFirstDayOfMonth : dateWithLastDayOfMonth;

  return newDate.getFullYear() + newDate.getMonth() / 12;
};

export const numberToDateString = (num: number, monthEnd?: boolean): TDateString => {
  const year = Math.floor(num);
  const month = Math.round((num - year) * 12);
  const date = monthEnd ? new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)) : new Date(Date.UTC(year, month));

  return formatDate(createDateString(date));
};

export const getEndYear = (date: TDateString): number | null => {
  const adjustedDate = createDate(date);
  if (!adjustedDate) {
    return null;
  }

  if (adjustedDate.getMonth() !== 0 || adjustedDate.getDate() !== 1) {
    adjustedDate.setFullYear(adjustedDate.getFullYear() + 1);
  }

  adjustedDate.setMonth(0, 1);
  const result = dateToNumber(formatDate(createDateString(adjustedDate)), 'lastDay');

  if (result === null) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  return result;
};

export const getBeginingOfYear = (date: TDateString): number | null => {
  const adjustedDate = createDate(date);
  if (!adjustedDate) {
    return null;
  }

  adjustedDate.setMonth(0, 1);
  const result = dateToNumber(formatDate(createDateString(adjustedDate)), 'firstDay');

  if (result === null) {
    // eslint-disable-next-line no-console
    console.error('Invalid date');
    return null;
  }

  return result;
};

export const createDate = (date?: TDateTimeString | TDateString) => {
  if (!date) {
    return null;
  }

  return new Date(date);
};

export const createIsoStringDate = (date?: TDateTimeString) => {
  if (!date) {
    return '';
  }

  return new Date(date).toISOString();
};

export const formatDate = (date: TDateTimeString, format: TDateFormat = defaultDateFormat): TDateString => {
  if (!date) {
    return null;
  }

  let dateString = '';

  switch (format) {
    case 'YYYY-MM-DD': {
      dateString = createIsoStringDate(date).split('T')[0];
      break;
    }

    case 'DD/MM/YYYY': {
      const dateValues = createIsoStringDate(date).split('T')[0].split('-');
      dateString = `${dateValues[2]}/${dateValues[1]}/${dateValues[0]}`;
      break;
    }

    case 'DD-MM-YY': {
      const dateFormatted = createDate(date);
      if (dateFormatted) {
        const day = dateFormatted.getDate().toString().padStart(2, '0');
        const month = (dateFormatted.getMonth() + 1).toString().padStart(2, '0');
        const year = dateFormatted.getFullYear().toString().slice(-2);
        dateString = `${day}-${month}-${year}`;
      } else {
        dateString = '';
      }
      break;
    }
  }

  if (checkValidDateStr(dateString)) {
    return dateString;
  }

  // eslint-disable-next-line no-console
  console.error(`[DATE UTILS] Invalid date string: ${date}`);
  return null;
};

const checkValidDateStr = (str: string): str is TDateStringInternal => {
  if (str.match(/^\d{4}-\d{2}-\d{2}$/) !== null) {
    return true;
  }

  if (str.match(/^\d{2}\/\d{2}\/\d{4}$/) !== null) {
    return true;
  }

  if (str.match(/^\d{2}-\d{2}-\d{2}$/) !== null) {
    return true;
  }

  return false;
};

const checkValidDateTimeStr = (dateTimeStr: string): dateTimeStr is TDateStringInternal => {
  const iso8601Regex = /^(\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))?)$/;

  if (!iso8601Regex.test(dateTimeStr)) {
    return false;
  }

  const date = new Date(dateTimeStr);
  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
};

export function createDateString(date?: Date | string): TDateTimeString {
  if (isNil(date)) {
    return null;
  }

  if (isString(date)) {
    if (checkValidDateTimeStr(date)) {
      return date;
    }

    // eslint-disable-next-line no-console
    console.error(`[DATE UTILS] Invalid datetime string: ${date}`);
    return null;
  }

  const dateString = new Date(date).toISOString();
  if (checkValidDateTimeStr(dateString)) {
    return dateString;
  }

  // eslint-disable-next-line no-console
  console.error(`[DATE UTILS] Invalid datetime string: ${date}`);
  return null;
}

export const returnMaxDate = (maxDate: TDateString, newSelectedMaxDate: TDateString): TDateString => {
  if (!maxDate || !newSelectedMaxDate) {
    // eslint-disable-next-line no-console
    console.error("[DATE UTILS] Can't return max date, invalid dates provided.");
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
};

export const returnMinDate = (minDate: TDateString, newSelectedMinDate: TDateString): TDateString => {
  if (!minDate || !newSelectedMinDate) {
    // eslint-disable-next-line no-console
    console.error("[DATE UTILS] Can't return min date, invalid dates provided.");
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
};

import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

enum DATE {}

export type TDateStringInternal = string & { __TYPE__: DATE };

export type TDateInternal = string & { __TYPE__: DATE };

export type TDateTimeString = TDateStringInternal | null;

export type TDateString = TDateInternal | null;

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

export const formatDate = (date: TDateTimeString, format: 'YYYY-MM-DD' = 'YYYY-MM-DD'): TDateString => {
  if (!date) {
    return null;
  }

  let dateString = '';

  switch (format) {
    case 'YYYY-MM-DD': {
      dateString = createIsoStringDate(date).split('T')[0];
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

  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};

const checkValidDateTimeStr = (str: string): str is TDateStringInternal => {
  if (str.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z$/) !== null) {
    return true;
  }

  return str.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/) !== null;
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

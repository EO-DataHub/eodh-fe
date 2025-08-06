import isString from 'lodash/isString';
import { enqueueSnackbar } from 'notistack';
import { FC, ReactNode } from 'react';

const calculateDisplayTime = (message: string) => {
  const readableWordsPerMinute = 180;
  const avarageWordLength = 5;
  const words = message.length / avarageWordLength;
  const wordsTime = (words / readableWordsPerMinute) * 60 * 1000;

  const delayTime = 1500;
  const bonusTime = 1000;

  return Math.round(delayTime + wordsTime + bonusTime);
};

const Message: FC<{ message: string | ReactNode }> = ({ message }) => {
  if (isString(message)) {
    return message;
  }

  return <span className='inline whitespace-pre-line'>{message}</span>;
};

export const displayNotification = (
  message: string | ReactNode,
  variant: 'success' | 'error' | 'warning' | 'info' | 'default'
) => {
  const displayTime = isString(message) ? calculateDisplayTime(message) : undefined;
  enqueueSnackbar(<Message message={message} />, {
    variant,
    persist: false,
    autoHideDuration: displayTime,
    disableWindowBlurListener: true,
  });
};

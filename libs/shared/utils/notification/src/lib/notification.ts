import { enqueueSnackbar } from 'notistack';

const calculateDisplayTime = (message: string) => {
  const readableWordsPerMinute = 180;
  const avarageWordLength = 5;
  const words = message.length / avarageWordLength;
  const wordsTime = (words / readableWordsPerMinute) * 60 * 1000;

  const delayTime = 1500;
  const bonusTime = 1000;

  return Math.round(delayTime + wordsTime + bonusTime);
};

export const displayNotification = (message: string, variant: 'success' | 'error' | 'warning' | 'info') => {
  const displayTime = calculateDisplayTime(message);
  enqueueSnackbar(message, { variant, persist: false, autoHideDuration: displayTime });
};

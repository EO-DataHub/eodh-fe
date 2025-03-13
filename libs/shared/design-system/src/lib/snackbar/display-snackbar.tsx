import { enqueueSnackbar } from 'notistack';

const calculateDisplayTime = (message: string) => { 
    const wpm = 180  // readable words per minute
    const wordLength = 5  // standardized number of chars in calculable word
    const words = (message.length)/wordLength
    const wordsTime = ((words/wpm)*60)*1000

    const delay = 1500  // milliseconds before user starts reading the notification
    const bonus = 1000  // extra time

    return delay + wordsTime + bonus
}

export const displaySnackbar = (message: string, variant: 'success' | 'error' | 'warning' | 'info') => {
  enqueueSnackbar(message, { variant, persist: true, autoHideDuration: calculateDisplayTime(message) });
}

import './snackbar.css';

import { SnackbarKey, useSnackbar } from 'notistack';

import { Icon } from '../icon/icon';

export const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey | undefined }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <div className='cursor-pointer absolute top-7 right-7' onClick={() => closeSnackbar(snackbarKey)}>
      <Icon name='Close' />
    </div>
  );
};

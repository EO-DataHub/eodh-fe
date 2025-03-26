import { SnackbarProvider as NotistackProvider } from 'notistack';
import { PropsWithChildren } from 'react';

import { Icon } from '../icon/icon';
import { SnackbarCloseButton } from './snackbar-close-button.component';

// todo use custom Notification component [https://ukri-spyrosoft.atlassian.net/browse/UKRIW-543]
export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider
      iconVariant={{
        default: <Icon name='Info' className='text-success-contrastText' width={28} height={28} />,
        success: <Icon name='Success' className='text-success-contrastText' width={28} height={28} />,
        error: <Icon name='Report' className='text-success-contrastText' width={28} height={28} />,
        warning: <Icon name='Warning' className='text-success-contrastText' width={28} height={28} />,
        info: <Icon name='Info' className='text-success-contrastText' width={28} height={28} />,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
    >
      {children}
    </NotistackProvider>
  );
};

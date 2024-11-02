import { Icon } from '@ukri/shared/design-system';
import { SnackbarKey, SnackbarProvider as NotistackProvider, useSnackbar } from 'notistack';
import { PropsWithChildren } from 'react';

const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: SnackbarKey | undefined }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <div className='cursor-pointer absolute top-7 right-7' onClick={() => closeSnackbar(snackbarKey)}>
      <Icon name='Close' />
    </div>
  );
};

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  return (
    <NotistackProvider
      iconVariant={{
        success: <Icon name='CheckedCircle' className='text-success-contrastText' />,
        error: <Icon name='Report' className='text-success-contrastText' />,
        warning: <Icon name='Warning' className='text-success-contrastText' />,
        info: <Icon name='Info' className='text-success-contrastText' />,
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      preventDuplicate={true}
      action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
    >
      {children}
    </NotistackProvider>
  );
};

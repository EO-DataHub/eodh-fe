import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';

const tagStyles = {
  READY: 'bg-success text-success-contrastText',
  PROCESSING: 'bg-warning text-bright',
  FAILED: 'bg-error text-error-contrastText',
};

export const Tag = ({ status }: { status: 'READY' | 'PROCESSING' | 'FAILED' }) => {
  return (
    <div className={clsx('rounded h-5 flex items-center', tagStyles[status])}>
      <Text
        content={`MAP.ACTION_CREATOR_PANEL.HISTORY.STATUS.${status}`}
        fontSize='small'
        fontWeight='bold'
        className='mx-1.5 my-[3px] uppercase'
      />
    </div>
  );
};

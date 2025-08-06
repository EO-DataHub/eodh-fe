import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';

const tagStyles = {
  VERIFIED: 'bg-success text-success-contrastText',
};

export const Tag = ({ status, title }: { status?: 'VERIFIED'; title: string }) => {
  if (status !== 'VERIFIED') {
    return;
  }

  return (
    <div className={clsx('rounded h-5 flex items-center', tagStyles[status])}>
      <Text content={title} fontSize='small' fontWeight='regular' className='mx-1.5 my-[3px] uppercase' />
    </div>
  );
};

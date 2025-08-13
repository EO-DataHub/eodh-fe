import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';

const tagStyles = {
  VERIFIED: 'bg-success text-success-contrastText',
  UNVERIFIED: 'bg-information text-information-contrastText',
};

export const Tag = ({ status }: { status?: 'VERIFIED' | 'UNVERIFIED' }) => {
  switch (status) {
    case 'VERIFIED': {
      return (
        <div className={clsx('rounded h-5 flex items-center', tagStyles[status])}>
          <Text
            content='MAP.ACTION_CREATOR_PANEL.PRESETS.STATUS.VERIFIED'
            fontSize='small'
            fontWeight='regular'
            className='mx-1.5 my-[3px] uppercase'
          />
        </div>
      );
    }

    case 'UNVERIFIED': {
      return (
        <div className={clsx('rounded h-5 flex items-center', tagStyles[status])}>
          <Text
            content='MAP.ACTION_CREATOR_PANEL.PRESETS.STATUS.UNVERIFIED'
            fontSize='small'
            fontWeight='regular'
            className='mx-1.5 my-[3px] uppercase'
          />
        </div>
      );
    }

    default: {
      return null;
    }
  }
};

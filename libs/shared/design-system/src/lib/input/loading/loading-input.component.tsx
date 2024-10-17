import clsx from 'clsx';
import { FC } from 'react';

import { LoadingSpinner } from '../../loader/loading-spinner';
import { loadingInputStyles } from './loading-input.styles';

interface ITextInputProps {
  className?: string;
}

export const LoadingInput: FC<ITextInputProps> = ({ className }) => {
  return (
    <div>
      <div className={clsx(loadingInputStyles.container, className)}>
        <div className={loadingInputStyles.input}>
          <LoadingSpinner size='xs' />
        </div>
      </div>
    </div>
  );
};

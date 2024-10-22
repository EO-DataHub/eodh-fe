import { Icon } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { FC } from 'react';

const searchInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container: (error?: boolean) =>
    `flex items-center border rounded p-1.5 bg-bright-light h-7 focus-within:ring-1 focus-within:ring-primary-light focus-within:border-primary-light ${
      error ? 'border-error' : 'border-bright-dark'
    }`,
  icon: 'text-neutral-dark',
  input: (hasIcon: boolean) =>
    `flex-grow py-1 bg-bright-light text-action-creator-body text-text whitespace-nowrap overflow-hidden text-ellipsis outline-none w-[calc(100%-16px)] caret-transparent cursor-default ${
      hasIcon ? 'px-2' : 'pr-2'
    }`,
  clearButton: 'text-neutral-light focus:outline-none flex justify-center items-center',
};

interface INodeInputProps {
  value?: string;
  onClearButtonClick?: () => void;
  className?: string;
  iconName?: 'Polygon' | 'Circle' | 'Satellite' | 'Square';
  error?: boolean;
}

export const NodeInput: FC<INodeInputProps> = ({ value, onClearButtonClick, className, iconName, error }) => {
  return (
    <div>
      <div className={clsx(searchInputStyles.container(error), className)}>
        {iconName && <Icon name={iconName} width={12} height={12} className={searchInputStyles.icon} />}
        <input readOnly type='text' className={searchInputStyles.input(!!iconName)} value={value} />
        {!error && (
          <button className={searchInputStyles.clearButton} onClick={onClearButtonClick}>
            <Icon name='Close' width={16} height={16} />
          </button>
        )}
      </div>
    </div>
  );
};

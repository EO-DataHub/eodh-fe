import React, { ReactNode, useState } from 'react';

import { Icon, TIconNames } from '../icon/icon';
import { notificationStyles } from './notification.styles';

interface INotificationProps {
  type: 'error' | 'error-light' | 'warning' | 'success' | 'information' | 'general';
  children: ReactNode | string;
  className?: string;
  iconName?: TIconNames;
  closeButtonVisible?: boolean;
}

export const Notification = ({
  type,
  children,
  className,
  iconName = 'Warning',
  closeButtonVisible = true,
}: INotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${notificationStyles.container} ${notificationStyles.type[type]} ${className}`}>
      <Icon name={iconName} />
      <div className={notificationStyles.content}>{children}</div>
      {closeButtonVisible && (
        <button onClick={handleClose} className='absolute top-2 right-2'>
          <Icon name='Close' />
        </button>
      )}
    </div>
  );
};

import React, { ReactNode, useState } from 'react';

import { Icon } from '../icon/icon';
import { notificationStyles } from './notification.styles';

interface INotificationProps {
  type: 'error' | 'warning' | 'success' | 'information' | 'general';
  children: ReactNode | string;
  className?: string;
}

export const Notification = ({ type, children, className }: INotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${notificationStyles.container} ${notificationStyles.type[type]} ${className}`}>
      <Icon name='Warning' />
      <div className={notificationStyles.content}>{children}</div>
      <button onClick={handleClose} className='absolute top-2 right-2'>
        <Icon name='Close' />
      </button>
    </div>
  );
};

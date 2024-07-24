import React from 'react';

import Icon from '../icon/icon';

interface INotificationProps {
  type: 'error' | 'warning' | 'success' | 'information' | 'general';
  children: React.ReactNode | string;
}

const Notification = ({ type, children }: INotificationProps) => {
  const typeStyles = {
    error: 'bg-error text-error-contrastText',
    warning: 'bg-warning text-warning-contrastText',
    success: 'bg-success text-success-contrastText',
    information: 'bg-information text-information-contrastText',
    general: 'bg-bright-light text-text-primary',
  };

  return (
    <div className={`rounded-lg p-4 mb-4 flex items-start shadow ${typeStyles[type]}`}>
      <Icon name='Warning' />
      <div className=' ml-5'>{children}</div>
    </div>
  );
};

export default Notification;

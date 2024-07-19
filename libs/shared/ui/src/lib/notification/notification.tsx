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

  const icons = {
    error: '⚠️',
    warning: '⚠️',
    success: '✔️',
    information: 'ℹ️',
    general: 'ℹ️',
  };

  return (
    <div className={`rounded-lg p-4 mb-4 flex items-start ${typeStyles[type]}`}>
      <Icon name='Bolt' />
      {/* to update with Icon component */}
      <div className='mr-3'>{icons[type]}</div>
      <div className='flex-grow'>{children}</div>
    </div>
  );
};

export default Notification;

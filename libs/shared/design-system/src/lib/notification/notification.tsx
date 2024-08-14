import { ReactNode } from 'react';

import { Icon } from '../icon/icon';
import { notificationStyles } from './notification.styles';

interface INotificationProps {
  type: 'error' | 'warning' | 'success' | 'information' | 'general';
  children: ReactNode | string;
}

const Notification = ({ type, children }: INotificationProps) => {
  return (
    <div className={`${notificationStyles.container} ${notificationStyles.type[type]}`}>
      <Icon name='Warning' />
      <div className={notificationStyles.content}>{children}</div>
    </div>
  );
};

export default Notification;

import { ParseKeys } from 'i18next';
import isString from 'lodash/isString';
import { ReactNode } from 'react';

import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { twMerge } from '../merge.tailwind';
import { Text } from '../text/text';

const ErrorIcon = ({ icon }: { icon: TIconNames | ReactNode | null }) => {
  if (!icon) {
    return null;
  }

  if (isString(icon)) {
    return <Icon name={icon as TIconNames} width={48} height={48} className='mb-4' />;
  }

  return icon;
};

interface IErrorProps {
  className?: string;
  icon?: TIconNames | ReactNode | null;
  title: string;
  message: string;
  ctaText?: ParseKeys;
  ctaOnClick?: () => void;
}

export const Error = ({ icon, title, message, className = '', ctaText, ctaOnClick }: IErrorProps) => {
  return (
    <div className={twMerge('text-text text-center m-4', className)}>
      <ErrorIcon icon={icon} />
      <Text type='h1' fontSize='large' fontWeight='bold' content={title} className='mb-4' />
      <Text type='h2' content={message} fontSize='medium' fontWeight='regular' className='mb-4' />
      {ctaText && ctaOnClick && (
        <Button text={ctaText} onClick={ctaOnClick} appearance='text' className='mx-auto font-normal' />
      )}
    </div>
  );
};

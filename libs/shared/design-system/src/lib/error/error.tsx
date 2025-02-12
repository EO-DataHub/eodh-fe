import { ParseKeys } from 'i18next';
import isString from 'lodash/isString';
import { ReactNode } from 'react';

import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

const ErrorIcon = ({ icon }: { icon: TIconNames | ReactNode | null }) => {
  if (!icon) {
    return null;
  }

  if (isString(icon)) {
    return <Icon name={icon as TIconNames} width={48} height={48} className='mr-1.5 mb-4' />;
  }

  return icon;
};

interface IErrorProps {
  icon?: TIconNames | ReactNode | null;
  title: string;
  message: string;
  ctaText?: ParseKeys;
  ctaOnClick?: () => void;
}

export const Error = ({ icon, title, message, ctaText, ctaOnClick }: IErrorProps) => {
  return (
    <div className='text-text text-center p-4'>
      <ErrorIcon icon={icon} />
      <Text type='h1' fontSize='large' fontWeight='bold' content={title} className='mb-4' />
      <Text type='h2' content={message} fontSize='medium' fontWeight='regular' className='mb-4' />
      {ctaText && ctaOnClick && (
        <Button text={ctaText} onClick={ctaOnClick} appearance='text' className='mx-auto font-normal' />
      )}
    </div>
  );
};

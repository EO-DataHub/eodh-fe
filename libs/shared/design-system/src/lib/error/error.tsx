import { ParseKeys } from 'i18next';

import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

interface IErrorProps {
  iconName?: TIconNames | null;
  title: string;
  message: string;
  ctaText?: ParseKeys;
  ctaOnClick?: () => void;
}

export const Error = ({ iconName, title, message, ctaText, ctaOnClick }: IErrorProps) => {
  return (
    <div className='text-text text-center p-4'>
      {iconName && <Icon name={iconName} width={48} height={48} className='mr-1.5 mb-4' />}
      <Text type='h1' fontSize='large' fontWeight='bold' content={title} className='mb-4' />
      <Text type='h2' content={message} fontSize='medium' fontWeight='regular' className='mb-4' />
      {ctaText && ctaOnClick && (
        <Button text={ctaText} onClick={ctaOnClick} appearance='text' className='mx-auto font-normal' />
      )}
    </div>
  );
};

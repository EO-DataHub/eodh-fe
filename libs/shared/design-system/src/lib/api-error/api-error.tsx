import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

interface IApiErrorProps {
  iconName?: TIconNames;
  title: string;
  message: string;
  buttonText?: string;
  buttonOnClick?: () => void;
}

export const ApiError = ({ iconName = 'Satellite', title, message, buttonText, buttonOnClick }: IApiErrorProps) => {
  return (
    <div className='text-text text-center p-4'>
      <Icon name={iconName} width={48} height={48} className='mr-1.5 mb-4' />
      <Text type='h1' fontSize='large' fontWeight='bold' content={title} className='mb-4' />
      <Text type='h2' content={message} fontSize='medium' fontWeight='regular' className='mb-4' />
      {buttonText && buttonOnClick && (
        <Button text={buttonText} onClick={buttonOnClick} appearance='text' className='mx-auto' />
      )}
    </div>
  );
};

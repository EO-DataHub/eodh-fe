import { Button } from '../button/button';
import { Icon, type TIconNames } from '../icon/icon';
import { Text } from '../text/text';

interface IApiErrorProps {
  iconName?: TIconNames;
  title: string;
  message: string;
  buttonText: string;
  buttonOnClick?: () => void;
}

export const ApiError = ({ iconName = 'Satellite', title, message, buttonText, buttonOnClick }: IApiErrorProps) => {
  return (
    <div className={``}>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={title} fontSize='medium' fontWeight='regular' />
      <Text type='span' content={message} fontSize='medium' fontWeight='regular' />
      {buttonText && buttonOnClick && <Button text={buttonText} onClick={buttonOnClick} />}
    </div>
  );
};

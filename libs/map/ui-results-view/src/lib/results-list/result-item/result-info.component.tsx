import { Icon, Text, TIconNames } from '@ukri/shared/design-system';

interface IResultItemInfoProps {
  value: string;
  iconName: TIconNames;
}

export const ResultItemInfo = ({ value, iconName }: IResultItemInfoProps) => {
  return (
    <span className='flex items-start'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={value} translate={false} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

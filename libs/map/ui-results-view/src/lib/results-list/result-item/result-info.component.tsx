import { Icon, Text, TIconNames } from '@ukri/shared/design-system';

interface IResultItemInfoProps {
  value: string | undefined;
  iconName: TIconNames;
}

export const ResultItemInfo = ({ value, iconName }: IResultItemInfoProps) => {
  const formattedValue = value?.length ? value : 'N/A';
  return (
    <span className='flex items-start'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={formattedValue} translate={false} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

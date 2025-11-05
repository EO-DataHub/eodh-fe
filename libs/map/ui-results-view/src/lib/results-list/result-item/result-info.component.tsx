import { Icon, Text, TIconNames } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

interface IResultItemInfoProps {
  value: string | undefined;
  iconName: TIconNames;
}

export const ResultItemInfo = ({ value, iconName }: IResultItemInfoProps) => {
  const { t } = useTranslation();
  const formattedValue = value === undefined ? t('MAP.SEARCH_VIEW.DATA_SETS.N_A') : value;

  return (
    <span className='flex items-start'>
      <Icon name={iconName} width={16} height={16} className='mr-1.5' />
      <Text type='span' content={formattedValue} translate={false} fontSize='medium' fontWeight='regular' />
    </span>
  );
};

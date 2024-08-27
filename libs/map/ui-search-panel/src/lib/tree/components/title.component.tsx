import { Text } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';

type TTile = {
  title: ParseKeys;
  className?: string;
  fontWeight?: 'bold' | 'regular';
};

export const Title = ({ title, className = '', fontWeight = 'bold' }: TTile) => {
  return (
    <Text
      content={title}
      type='p'
      fontSize='medium'
      fontWeight={fontWeight}
      className={`text-neutral-dark ${className}`}
    />
  );
};

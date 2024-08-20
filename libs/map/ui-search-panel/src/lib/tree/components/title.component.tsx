import { Text } from '@ukri/shared/design-system';
import { TTranslation } from '@ukri/shared/utils/translate';

type TTile = {
  title: TTranslation;
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

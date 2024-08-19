import { Text } from '@ukri/shared/design-system';

export const Title = ({
  title,
  className = '',
  fontWeight = 'bold',
}: {
  title: string;
  className?: string;
  fontWeight?: 'bold' | 'regular';
}) => {
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

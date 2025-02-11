import { Text } from '@ukri/shared/design-system';

import { helpStyles } from './help.styles';

interface ISubtitleProps {
  subtitle: string;
}

export const Subtitle = ({ subtitle }: ISubtitleProps) => {
  return (
    <div className={helpStyles.subtitle}>
      <Text type='h3' content={subtitle} fontSize='large' fontWeight='semibold' />
    </div>
  );
};

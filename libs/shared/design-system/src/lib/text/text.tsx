import clsx from 'clsx';
import { ReactNode } from 'react';

interface ITextProps {
  content: ReactNode | string;
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontSize?: 'large' | 'medium' | 'small';
  fontWeight?: 'bold' | 'semibold' | 'regular';
  className?: string;
}

export const Text = ({
  className,
  content,
  type = 'p',
  fontSize = 'small',
  fontWeight = 'regular',
}: ITextProps): JSX.Element => {
  const baseStyles = `text-${fontSize}-${fontWeight}`;

  const combinedStyles = clsx(baseStyles, className);

  const Tag = type as keyof JSX.IntrinsicElements;
  return <Tag className={combinedStyles}>{content}</Tag>;
};

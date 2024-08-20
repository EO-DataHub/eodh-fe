// eslint-disable-next-line @nx/enforce-module-boundaries
import { TTranslation } from '@ukri/shared/utils/translate';
import clsx from 'clsx';
import isString from 'lodash/isString';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface ITextProps {
  content: ReactNode | TTranslation;
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
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
  const { t } = useTranslation();
  const translatedContent = isString(content) ? t(content) : content;

  const Tag = type as keyof JSX.IntrinsicElements;
  return <Tag className={combinedStyles}>{translatedContent}</Tag>;
};

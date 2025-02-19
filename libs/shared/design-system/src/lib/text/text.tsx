import clsx from 'clsx';
import { ParseKeys } from 'i18next';
import isString from 'lodash/isString';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type TReactNode =
  | Exclude<ReactNode, string | Iterable<ReactNode>>
  | Iterable<Exclude<ReactNode, string | Iterable<ReactNode>>>;

interface ITextProps {
  content: ParseKeys | TReactNode;
  translate?: boolean;
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  fontSize?: 'large' | 'medium' | 'small';
  fontWeight?: 'bold' | 'semibold' | 'regular';
  fontType?: 'body';
  className?: string;
}

export const Text = ({
  className,
  content,
  translate = true,
  type = 'p',
  fontSize = 'small',
  fontWeight = 'regular',
  fontType,
}: ITextProps): JSX.Element => {
  const fontPrefix = fontType ? `${fontType}-` : '';
  const baseStyles = `text-${fontPrefix}${fontSize}-${fontWeight}`;
  const combinedStyles = clsx(baseStyles, className);
  const { t } = useTranslation();
  const translatedContent = isString(content) && translate ? t(content) : content;
  const Tag = type as keyof JSX.IntrinsicElements;

  return <Tag className={combinedStyles}>{translatedContent}</Tag>;
};

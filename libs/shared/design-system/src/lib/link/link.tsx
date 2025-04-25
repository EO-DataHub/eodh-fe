import clsx from 'clsx';
import isString from 'lodash/isString';
import { PropsWithChildren, ReactNode, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../icon/icon';
import * as IconsNames from '../icon/icons/index';
import { getAppearanceStyles, getBaseStyles, getDisplayStyles, getShadowStyles, getSizeStyles } from './link.styles';

interface ILinkProps {
  text: string | ReactNode;
  type?: 'button' | 'link';
  appearance?: 'default' | 'outlined' | 'outlined-white' | 'text';
  size?: 'small' | 'medium' | 'large';
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconName?: keyof typeof IconsNames;
  iconWidth?: number;
  iconHeight?: number;
  href: string;
}
export const Link = ({
  text,
  appearance = 'default',
  size = 'large',
  iconName,
  iconWidth,
  iconHeight,
  className,
  onClick,
  type = 'link',
  children,
  target,
  href,
}: PropsWithChildren<ILinkProps>) => {
  const [visited, setVisited] = useState(false);
  const baseStyles = getBaseStyles(appearance);
  const displayStyles = getDisplayStyles();
  const shadowStyles = getShadowStyles(appearance);
  const appearanceStyles = getAppearanceStyles(appearance, type === 'link' && visited);
  const sizeStyles = getSizeStyles(size, appearance);
  const { t } = useTranslation();

  const content = useMemo(() => {
    if (!isString(text)) {
      return text;
    }

    return t(text);
  }, [text, t]);

  const combinedStyles = clsx(baseStyles, displayStyles, appearanceStyles, sizeStyles, shadowStyles, className);

  const handleClick = useCallback(() => {
    setVisited(true);

    if (onClick) {
      onClick();
    }
  }, [onClick]);

  if (type === 'link') {
    return (
      <a className={combinedStyles} onClick={handleClick} href={href} target={target}>
        {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
        {content}
        {children}
      </a>
    );
  }

  return (
    <a href={href} type={type} className={combinedStyles} onClick={handleClick}>
      {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
      {content}
      {children}
    </a>
  );
};

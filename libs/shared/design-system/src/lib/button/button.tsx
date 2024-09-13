import clsx from 'clsx';
import isString from 'lodash/isString';
import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../icon/icon';
import * as IconsNames from '../icon/icons/index';
import {
  getAppearanceStyles,
  getBaseStyles,
  getDisabledStyles,
  getDisplayStyles,
  getShadowStyles,
  getSizeStyles,
} from './button.styles';

interface IButtonProps {
  text: string | ReactNode;
  type?: 'button' | 'reset' | 'submit';
  appearance?: 'default' | 'outlined' | 'outlined-white' | 'text';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconName?: keyof typeof IconsNames;
  iconWidth?: number;
  iconHeight?: number;
}
export const Button = ({
  text,
  appearance = 'default',
  size = 'large',
  iconName,
  iconWidth,
  iconHeight,
  className,
  onClick,
  disabled = false,
  type = 'button',
}: IButtonProps) => {
  const baseStyles = getBaseStyles(disabled, appearance);
  const displayStyles = getDisplayStyles();
  const shadowStyles = getShadowStyles(appearance);
  const appearanceStyles = getAppearanceStyles(appearance);
  const sizeStyles = getSizeStyles(size, appearance);
  const disabledStyles = getDisabledStyles(disabled, appearance);
  const { t } = useTranslation();

  const content = useMemo(() => {
    if (!isString(text)) {
      return text;
    }

    return t(text);
  }, [text, t]);

  const combinedStyles = clsx(
    baseStyles,
    displayStyles,
    appearanceStyles,
    sizeStyles,
    shadowStyles,
    disabledStyles,
    className
  );

  return (
    <button type={type} className={combinedStyles} onClick={onClick} disabled={disabled}>
      {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
      {content}
    </button>
  );
};

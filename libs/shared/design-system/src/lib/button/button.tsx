import clsx from 'clsx';
import isString from 'lodash/isString';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
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
import { useSafariFix } from './use-safari-fix.hook';

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isActive, setIsActive } = useSafariFix({ buttonRef });
  const baseStyles = getBaseStyles(disabled, appearance, isActive);
  const displayStyles = getDisplayStyles();
  const shadowStyles = getShadowStyles(appearance);
  const appearanceStyles = getAppearanceStyles(appearance, isActive);
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

  const handleClick = useCallback(() => {
    if (disabled) {
      return;
    }
    setIsActive(true);
    if (onClick) {
      onClick();
    }
  }, [onClick, disabled, setIsActive]);

  return (
    <button ref={buttonRef} type={type} className={combinedStyles} onClick={handleClick} disabled={disabled}>
      {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
      {content}
    </button>
  );
};

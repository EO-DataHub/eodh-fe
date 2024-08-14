import clsx from 'clsx';

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
  text: string;
  appearance?: 'default' | 'outlined' | 'outlined-white';
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
}: IButtonProps) => {
  const baseStyles = getBaseStyles(disabled);
  const displayStyles = getDisplayStyles();
  const shadowStyles = getShadowStyles(appearance);
  const appearanceStyles = getAppearanceStyles(appearance);
  const sizeStyles = getSizeStyles(size, appearance);
  const disabledStyles = getDisabledStyles(disabled, appearance);

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
    <button className={combinedStyles} onClick={onClick} disabled={disabled}>
      {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
      {text}
    </button>
  );
};

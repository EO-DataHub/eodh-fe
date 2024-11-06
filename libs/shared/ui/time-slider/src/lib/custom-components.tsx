import { PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTooltip } from './styled-tooltip.component';

const translationPath = 'GLOBAL.DESIGN_SYSTEM.TIME_SLIDER.MONTHS';
const MONTH_KEYS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const ValueLabelComponent = ({ children, value }: { children: React.ReactElement; value: number }) => {
  const { t } = useTranslation();
  const MONTHS = useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const year = Math.floor(value);
  const monthIndex = Math.round((value - year) * 12);

  return <StyledTooltip title={`${MONTHS[monthIndex]} ${year}`}>{children}</StyledTooltip>;
};

const getHeight = (dataIndex: number): number => {
  return dataIndex % 12 === 0 ? 46 : 30;
};

interface ICustomMarkProps {
  className: string;
  style: { width: number; height: number };
  'data-index': number;
}

export const CustomMark = ({ className, style, 'data-index': dataIndex }: ICustomMarkProps) => (
  <div
    className={`absolute bg-bright-dark bottom-0 ${className}`}
    style={{
      ...style,
      width: 1,
      height: getHeight(dataIndex),
    }}
  />
);

interface ICustomLabelProps {
  'data-index': number;
  className: string;
  ownerState: { min: number; max: number };
  style: { right: string };
}

export const CustomLabel = ({
  'data-index': dataIndex,
  className,
  ownerState,
  style,
  children,
}: PropsWithChildren<ICustomLabelProps>) => {
  const { t } = useTranslation();
  const MONTHS = useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const month = ownerState.max - ownerState.min === 1 ? MONTHS[dataIndex] : '';

  return (
    <div className={`absolute w-auto -bottom-[5px] ${className}`} style={{ ...style }}>
      {month && <div className='relative bottom-auto left-1/2 translate-x-1/2'>{month}</div>}
      <div className='absolute -translate-x-1/2'>{children}</div>
    </div>
  );
};

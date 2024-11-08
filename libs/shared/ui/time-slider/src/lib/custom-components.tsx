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
  ownerState,
  className,
  style,
  'data-index': dataIndex,
  children,
}: PropsWithChildren<ICustomLabelProps>) => {
  const { t } = useTranslation();
  const MONTHS = useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const month = ownerState.max - ownerState.min === 1 ? MONTHS[dataIndex] : '';

  return (
    <div>
      {month && (
        <div className={`absolute bottom-auto w-1/12 flex ${className}`} style={{ ...style }}>
          <span className='relative w-full text-center mt-[5px]'>{month}</span>
        </div>
      )}
      <div className={`absolute w-auto -bottom-[5px] ${className}`} style={{ ...style }}>
        <div className='absolute -translate-x-1/2'>{children}</div>
      </div>
    </div>
  );
};

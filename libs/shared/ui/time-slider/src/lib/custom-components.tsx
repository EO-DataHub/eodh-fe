import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyledTooltip } from './styled-tooltip.component';

const translationPath = 'GLOBAL.DESIGN_SYSTEM.TIME_SLIDER.MONTHS';
const MONTH_KEYS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export const ValueLabelComponent = ({ children, value }: { children: React.ReactElement; value: number }) => {
  const { t } = useTranslation();
  const MONTHS = React.useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const year = Math.floor(value);
  const monthIndex = Math.round((value - year) * 12);
  return <StyledTooltip title={`${MONTHS[monthIndex]} ${year}`}>{children}</StyledTooltip>;
};

export const CustomMark: React.FC<{ 'data-index': number; className: string; style: { right: string } }> = (props) => (
  <div
    className={`absolute bg-bright-dark bottom-0 ${props.className}`}
    style={{
      ...props.style,
      width: 1,
      height: props['data-index'] % 12 === 0 ? 46 : 30,
    }}
  />
);

export const CustomLabel = (props: {
  'data-index': number;
  className: string;
  ownerState: { min: number; max: number };
  style: { right: string };
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const MONTHS = React.useMemo(() => MONTH_KEYS.map((key) => t(`${translationPath}.${key}`)), [t]);
  const month = props.ownerState.max - props.ownerState.min === 1 ? MONTHS[props['data-index']] : '';

  return (
    <div className={props.className} style={{ ...props.style, position: 'absolute', width: 'auto', bottom: '-5px' }}>
      {month && <div className='relative bottom-auto left-1/2 translate-x-1/2'>{month}</div>}
      <div className='absolute -translate-x-1/2'>{props.children}</div>
    </div>
  );
};

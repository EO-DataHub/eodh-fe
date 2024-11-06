import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';
import React, { PropsWithChildren } from 'react';

interface IStyledTooltipProps {
  className?: string;
  title: string;
}

export const StyledTooltip = styled(({ className, title, ...props }: PropsWithChildren<IStyledTooltipProps>) => (
  <Tooltip title={title} {...props} classes={{ popper: className }} arrow enterTouchDelay={0} placement='top'>
    {React.isValidElement(props.children) ? props.children : <span />}
  </Tooltip>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: '#606060',
    fontSize: '12px',
    fontWeight: 600,
    padding: '12px 18px',
    borderRadius: '4px',
    boxShadow: '0px 4px 10px 0px #0000001A',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',
  },
}));

import React from 'react';

export interface ISharedUiButtonProps {
  ctaText: string;
}

const SharedUiButton = (props: ISharedUiButtonProps) => {
  return <button>{props.ctaText}</button>;
};

export default SharedUiButton;

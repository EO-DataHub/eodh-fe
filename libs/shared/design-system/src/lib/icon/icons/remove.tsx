import IIconProps from './icon.type';

const Remove = ({ width = 10, height = 2 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 10 2' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M0.25 1.54166V0.458328H9.75V1.54166H0.25Z' fill='currentColor' />
  </svg>
);

export default Remove;

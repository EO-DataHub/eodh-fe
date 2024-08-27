import IIconProps from './icon.type';

const Remove = ({ width = 24, height = 24 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.25 12.75C6.0375 12.75 5.85942 12.6781 5.71575 12.5342C5.57192 12.3904 5.5 12.2122 5.5 11.9997C5.5 11.7871 5.57192 11.609 5.71575 11.4655C5.85942 11.3218 6.0375 11.25 6.25 11.25H17.75C17.9625 11.25 18.1406 11.3219 18.2843 11.4658C18.4281 11.6096 18.5 11.7878 18.5 12.0003C18.5 12.2129 18.4281 12.391 18.2843 12.5345C18.1406 12.6782 17.9625 12.75 17.75 12.75H6.25Z'
      fill='currentColor'
    />
  </svg>
);

export default Remove;

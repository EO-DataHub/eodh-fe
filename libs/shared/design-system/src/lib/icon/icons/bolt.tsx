import IIconProps from './icon.type';

const Bolt = ({ width = 24, height = 24 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M10.5501 18.2L15.7251 12H11.7251L12.4501 6.32496L7.82515 13H11.3001L10.5501 18.2ZM8.57715 21.4422L9.57715 14.5H4.95215L13.1924 2.60571H14.4231L13.4329 10.5H18.9326L9.8079 21.4422H8.57715Z'
      fill='currentColor'
    />
  </svg>
);

export default Bolt;

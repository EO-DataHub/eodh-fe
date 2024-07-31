import IIconProps from './icon.type';

const Bolt = ({ width = 5, height = 8 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.55015 16.2L11.7251 9.99996H7.72515L8.45015 4.32496L3.82515 11H7.30015L6.55015 16.2ZM4.57715 19.4422L5.57715 12.5H0.952148L9.1924 0.605713H10.4231L9.4329 8.49996H14.9326L5.8079 19.4422H4.57715Z'
      fill='currentColor'
    />
  </svg>
);

export default Bolt;

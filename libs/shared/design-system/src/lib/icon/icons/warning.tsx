import IIconProps from './icon.type';

const Warning = ({ width = 24, height = 24 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <mask id='mask0_2729_35434' maskUnits='userSpaceOnUse' x='0' y='0' width='24' height='24'>
      <rect width='24' height='24' fill='#D9D9D9' />
    </mask>
    <g mask='url(#mask0_2729_35434)'>
      <path
        d='M3.42558 20.5001C3.25608 20.5001 3.10383 20.4586 2.96883 20.3758C2.83383 20.293 2.72891 20.1837 2.65408 20.0481C2.57608 19.9134 2.53316 19.7676 2.52533 19.6106C2.5175 19.4536 2.55983 19.2981 2.65233 19.1441L11.2131 4.35605C11.3057 4.20205 11.4216 4.08822 11.5606 4.01455C11.6997 3.94089 11.8462 3.90405 12.0001 3.90405C12.1539 3.90405 12.3004 3.94089 12.4396 4.01455C12.5786 4.08822 12.6944 4.20205 12.7871 4.35605L21.3478 19.1441C21.4403 19.2981 21.4827 19.4536 21.4748 19.6106C21.467 19.7676 21.4241 19.9134 21.3461 20.0481C21.2712 20.1837 21.1663 20.293 21.0313 20.3758C20.8963 20.4586 20.7441 20.5001 20.5746 20.5001H3.42558ZM4.45008 19.0001H19.5501L12.0001 6.00005L4.45008 19.0001ZM12.0001 17.8078C12.2289 17.8078 12.4207 17.7304 12.5756 17.5756C12.7304 17.4207 12.8078 17.2289 12.8078 17.0001C12.8078 16.7712 12.7304 16.5794 12.5756 16.4246C12.4207 16.2697 12.2289 16.1923 12.0001 16.1923C11.7712 16.1923 11.5794 16.2697 11.4246 16.4246C11.2697 16.5794 11.1923 16.7712 11.1923 17.0001C11.1923 17.2289 11.2697 17.4207 11.4246 17.5756C11.5794 17.7304 11.7712 17.8078 12.0001 17.8078ZM12.0003 15.1923C12.213 15.1923 12.3911 15.1205 12.5346 14.9768C12.6782 14.833 12.7501 14.6548 12.7501 14.4423V10.9423C12.7501 10.7298 12.6782 10.5517 12.5343 10.4081C12.3905 10.2642 12.2123 10.1923 11.9998 10.1923C11.7872 10.1923 11.6091 10.2642 11.4656 10.4081C11.3219 10.5517 11.2501 10.7298 11.2501 10.9423V14.4423C11.2501 14.6548 11.322 14.833 11.4658 14.9768C11.6097 15.1205 11.7878 15.1923 12.0003 15.1923Z'
        fill='currentColor'
      />
    </g>
  </svg>
);

export default Warning;

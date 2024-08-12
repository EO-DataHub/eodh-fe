import IIconProps from './icon.type';

const ArrowRight = ({ width = 5, height = 8 }: IIconProps) => (
  <svg width={width} height={height} viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M0.5 9.29995C0.366667 9.29995 0.25 9.25412 0.15 9.16245C0.05 9.07079 0 8.94995 0 8.79995V1.19995C0 1.04995 0.05 0.929118 0.15 0.837451C0.25 0.745785 0.366667 0.699951 0.5 0.699951C0.533333 0.699951 0.65 0.749951 0.85 0.849951L4.475 4.47495C4.55833 4.55828 4.61667 4.64162 4.65 4.72495C4.68333 4.80828 4.7 4.89995 4.7 4.99995C4.7 5.09995 4.68333 5.19162 4.65 5.27495C4.61667 5.35828 4.55833 5.44162 4.475 5.52495L0.85 9.14995C0.8 9.19995 0.745833 9.23745 0.6875 9.26245C0.629167 9.28745 0.566667 9.29995 0.5 9.29995Z'
      fill='currentColor'
    />
  </svg>
);

export default ArrowRight;
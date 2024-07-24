export const SquareIcon = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask maskUnits='userSpaceOnUse' x='0' y='0' width='25' height='25'>
        <rect x='0.5' y='0.5' width='24' height='24' />
      </mask>
      <g>
        <path d='M5.5 21.5C4.95 21.5 4.47917 21.3042 4.0875 20.9125C3.69583 20.5208 3.5 20.05 3.5 19.5V5.5C3.5 4.95 3.69583 4.47917 4.0875 4.0875C4.47917 3.69583 4.95 3.5 5.5 3.5H19.5C20.05 3.5 20.5208 3.69583 20.9125 4.0875C21.3042 4.47917 21.5 4.95 21.5 5.5V19.5C21.5 20.05 21.3042 20.5208 20.9125 20.9125C20.5208 21.3042 20.05 21.5 19.5 21.5H5.5ZM5.5 19.5H19.5V5.5H5.5V19.5Z' />
      </g>
    </svg>
  );
};

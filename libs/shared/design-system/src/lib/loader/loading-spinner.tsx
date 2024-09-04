interface ILoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: ILoadingSpinnerProps) => {
  return (
    <div className={`flex relative w-16 h-16 *:animate-spin-cubic-bezier ${className}`}>
      <div
        className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
        style={{ animationDelay: '-0.45s' }}
      ></div>
      <div
        className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
        style={{ animationDelay: '-0.3s' }}
      ></div>
      <div
        className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'
        style={{ animationDelay: '-0.15s' }}
      ></div>
      <div className='absolute box-border block w-12 h-12 m-2 border-4 rounded-full border-t-primary border-b-transparent border-x-transparent'></div>
    </div>
  );
};

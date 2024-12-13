type TSize = 'xs' | 'lg';

interface ILoadingSpinnerProps {
  className?: string;
  size?: TSize;
}

const sizes: { [key in TSize]: { container: string; element: string } } = {
  xs: {
    container: 'w-4 h-4',
    element: 'w-4 h-4 border-2',
  },
  lg: {
    container: 'w-16 h-16',
    element: 'w-12 h-12 m-2 border-4',
  },
};

export const LoadingSpinner = ({ className, size = 'lg' }: ILoadingSpinnerProps) => {
  const containerClassName = `flex relative *:animate-spin-cubic-bezier ${sizes[size].container} ${className}`;
  const elementClassName = `absolute box-border block rounded-full border-t-primary border-b-transparent border-x-transparent ${sizes[size].element}`;

  return (
    <div className={containerClassName}>
      <div className={elementClassName} style={{ animationDelay: '-0.45s' }}></div>
      <div className={elementClassName} style={{ animationDelay: '-0.3s' }}></div>
      <div className={elementClassName} style={{ animationDelay: '-0.15s' }}></div>
      <div className={elementClassName}></div>
    </div>
  );
};

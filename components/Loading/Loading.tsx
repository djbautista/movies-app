import { twMerge } from 'tailwind-merge';

export type LoadingProps = React.HTMLAttributes<HTMLDivElement>;

export const getLoadingClassName = ({
  className,
}: Pick<LoadingProps, 'className'> = {}) => {
  return twMerge([
    'h-8 w-8',
    'animate-spin',
    'rounded-full',
    'border-t-2 border-blue-500',
    className,
  ]);
};

export const Loading = ({ className, ...props }: LoadingProps) => {
  return <div className={getLoadingClassName({ className })} {...props} />;
};

export default Loading;

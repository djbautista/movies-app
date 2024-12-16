import { twMerge } from 'tailwind-merge';

export type Variant = 'primary' | 'neutral' | 'ghost';

const variants: Record<Variant, string[]> = {
  primary: [
    'bg-primary',
    'text-white',
    'hover:bg-primary-600',
    'active:bg-primary-700',
    'transition-colors',
    'duration-200',
  ],
  neutral: [
    'bg-neutral-50',
    'text-neutral',
    'hover:bg-neutral-100',
    'active:bg-neutral-200',
    'transition-colors',
    'duration-200',
  ],
  ghost: [
    'bg-transparent',
    'text-primary',
    'hover:bg-primary-50',
    'active:bg-primary-100',
    'transition-colors',
    'duration-200',
  ],
};

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const getButtonClassName = ({
  className,
  variant = 'primary',
}: Pick<ButtonProps, 'className' | 'variant'> = {}) => {
  return twMerge([
    'w-full',
    'rounded-sm',
    'px-6 py-4',
    'font-medium',
    variants[variant],
    className,
  ]);
};

export const Button = ({
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button className={getButtonClassName({ className, variant })} {...props}>
      {children}
    </button>
  );
};

export default Button;

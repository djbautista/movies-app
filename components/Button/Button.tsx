import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

export type Variant = 'primary' | 'neutral' | 'ghost';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.button, styles[`button--${variant}`], className)}
    >
      {children}
    </button>
  );
};

export default Button;

import { beforeEach, describe, expect, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import Button, { ButtonProps, Variant } from './Button';
import styles from './button.module.scss';

const setup = (props: ButtonProps = {}) =>
  render(<Button {...props} data-testid="button" />);

describe('Button', () => {
  beforeEach(cleanup);

  it('renders Button component with the default props', () => {
    setup();
    const button = screen.getByTestId('button');
    expect(button).toHaveClass(styles.button, styles['button--primary']);
  });

  it.each(['primary', 'neutral', 'ghost'] as Variant[])(
    `renders Button component with %s variant`,
    (variant) => {
      setup({ variant });
      const button = screen.getByTestId('button');
      expect(button).toHaveClass(styles.button, styles[`button--${variant}`]);
    },
  );

  it('renders Button component with custom className', () => {
    const customClassName = 'custom-class';
    setup({ className: customClassName });
    const button = screen.getByTestId('button');
    expect(button).toHaveClass(
      styles.button,
      styles['button--primary'],
      customClassName,
    );
  });
});

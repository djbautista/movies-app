import { beforeEach, describe, expect, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import Button, { ButtonProps, getButtonClassName, Variant } from './Button';
import { twMerge } from 'tailwind-merge';

const setup = (props: ButtonProps = {}) =>
  render(<Button {...props} data-testid="button" />);

describe('Button', () => {
  beforeEach(cleanup);

  const baseClassNames = ['w-full', 'rounded-sm', 'px-6 py-4', 'font-medium'];

  const variantClassNames = {
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
  };

  it('renders Button component with the default props', () => {
    const expectedClasses = [
      ...baseClassNames,
      ...variantClassNames['primary'],
    ];

    setup();
    const button = screen.getByTestId('button');
    const generatedClasses = getButtonClassName();

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(button.className).toBe(generatedClasses);
  });

  it.each(['primary', 'neutral'] as Variant[])(
    `renders Button component with %s variant`,
    (variant) => {
      const expectedClasses = [
        ...baseClassNames,
        ...variantClassNames[variant],
      ];

      setup({ variant });
      const button = screen.getByTestId('button');
      const generatedClasses = getButtonClassName({ variant });

      expect(generatedClasses).toBe(twMerge(expectedClasses));
      expect(button.className).toBe(generatedClasses);
    },
  );

  it('renders Button component with custom className', () => {
    const customClassName = 'custom-class';
    const expectedClasses = [
      ...baseClassNames,
      ...variantClassNames['primary'],
      customClassName,
    ];

    setup({ className: customClassName });
    const button = screen.getByTestId('button');
    const generatedClasses = getButtonClassName({ className: customClassName });

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(button.className).toBe(generatedClasses);
  });
});

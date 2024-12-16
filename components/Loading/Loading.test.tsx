import { twMerge } from 'tailwind-merge';
import { beforeEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import Loading, { getLoadingClassName, LoadingProps } from './Loading';

const setup = (props: LoadingProps = {}) =>
  render(<Loading {...props} data-testid="loading" />);

describe('Loading', () => {
  beforeEach(cleanup);

  const baseClassNames = [
    'h-8 w-8',
    'animate-spin',
    'rounded-full',
    'border-t-2 border-blue-500',
  ];

  it('renders Loading component with the default props', () => {
    const expectedClasses = [...baseClassNames];

    setup();
    const loading = screen.getByTestId('loading');
    const generatedClasses = getLoadingClassName();

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(loading.className).toBe(generatedClasses);
  });

  it('renders Loading component with custom className', () => {
    const customClassName = 'custom-class';
    const expectedClasses = [...baseClassNames, customClassName];

    setup({ className: customClassName });
    const loading = screen.getByTestId('loading');
    const generatedClasses = getLoadingClassName({
      className: customClassName,
    });

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(loading.className).toBe(generatedClasses);
  });
});

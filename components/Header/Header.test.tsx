import { twMerge } from 'tailwind-merge';
import { beforeEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import Header, { getHeaderClassName, HeaderProps } from './Header';

const setup = (props: HeaderProps = {}) =>
  render(<Header {...props} data-testid="header" />);

describe('Header', () => {
  beforeEach(cleanup);

  const baseClassNames = [
    'flex',
    'items-center',
    'justify-between',
    'bg-neutral-900',
    'px-[18px] py-5',
    'text-white',
  ];

  it('renders Header component with the default props', () => {
    const expectedClasses = [...baseClassNames];

    setup();
    const header = screen.getByTestId('header');
    const generatedClasses = getHeaderClassName();

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(header.className).toBe(generatedClasses);
  });

  it('renders Header component with custom className', () => {
    const customClassName = 'custom-class';
    const expectedClasses = [...baseClassNames, customClassName];

    setup({ className: customClassName });
    const header = screen.getByTestId('header');
    const generatedClasses = getHeaderClassName({ className: customClassName });

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(header.className).toBe(generatedClasses);
  });

  it('does not display back button when backHref is not provided', () => {
    setup();

    const backLink = screen.queryByRole('link');
    expect(backLink).not.toBeInTheDocument();
  });

  it('displays back button when backHref is provided', () => {
    setup({ backHref: '/back' });

    const backLink = screen.getByRole('link');
    expect(backLink).toBeInTheDocument();

    expect(backLink).toHaveAttribute('href', '/back');
  });

  it('renders children as header title', () => {
    const title = 'Header Title';
    setup({ children: title });

    const headerTitle = screen.getByText(title);
    expect(headerTitle).toBeInTheDocument();
  });
});

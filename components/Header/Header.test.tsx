import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import Header, { HeaderProps } from './Header';
import styles from './header.module.scss';

const setup = (props: HeaderProps = {}) =>
  render(<Header {...props} data-testid="header" />);

describe('Header', () => {
  beforeEach(cleanup);

  it('renders Header component with the default props', () => {
    setup();
    const header = screen.getByTestId('header');
    expect(header).toHaveClass(styles.header);
  });

  it('renders Header component with custom className', () => {
    const customClassName = 'custom-class';
    setup({ className: customClassName });

    const header = screen.getByTestId('header');
    expect(header).toHaveClass(styles.header, customClassName);
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
    expect(backLink).toHaveClass(styles['header__backLink']);
  });

  it('renders children as header title', () => {
    const title = 'Header Title';
    setup({ children: title });

    const headerTitle = screen.getByText(title);
    expect(headerTitle).toBeInTheDocument();
    expect(headerTitle).toHaveClass(styles['header__title']);
  });
});

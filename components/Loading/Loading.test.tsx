import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import Loading, { LoadingProps } from './Loading';
import styles from './loading.module.scss';

const setup = (props: LoadingProps = {}) =>
  render(<Loading {...props} data-testid="loading" />);

describe('Loading', () => {
  beforeEach(cleanup);

  it('renders Loading component with the default props', () => {
    setup();
    const loading = screen.getByTestId('loading');

    expect(loading).toHaveClass(styles.loading);
  });

  it('renders Loading component with custom className', () => {
    const customClassName = 'custom-class';
    setup({ className: customClassName });
    const loading = screen.getByTestId('loading');

    expect(loading).toHaveClass(styles.loading, customClassName);
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

import RootLayout, { metadata } from './layout';

const mocks = vi.hoisted(() => ({
  Providers: vi.fn(({ children }) => (
    <div data-testid="providers">{children}</div>
  )),
  Roboto: vi.fn(() => ({
    className: 'roboto-mock-classname',
  })),
}));

vi.mock('@/components/Providers', () => ({
  Providers: mocks.Providers,
}));

vi.mock('next/font/google', () => ({
  Roboto: mocks.Roboto,
}));

describe('Layout', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the html, body, and children through Providers', () => {
    const TestChild = () => <p data-testid="child">Hello</p>;
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>,
    );

    expect(mocks.Providers).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('providers')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');

    const htmlElement = document.querySelector('html');
    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('lang', 'en');

    const bodyElement = document.querySelector('body');
    expect(bodyElement).toBeInTheDocument();
  });

  it('has the correct metadata', () => {
    expect(metadata.title).toBe('Popular Movies');
    expect(metadata.description).toBe('Popular movies and TV shows');
  });
});

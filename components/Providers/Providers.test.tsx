import React from 'react';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

const mocks = vi.hoisted(() => {
  return {
    QueryClient: vi.fn((config) => config),
    QueryClientProvider: vi.fn(({ client, children }) => {
      return (
        <div
          data-testid="query-client-provider"
          data-client={JSON.stringify(client)}
        >
          {children}
        </div>
      );
    }),
  };
});

vi.mock('@tanstack/react-query', async () => {
  return {
    QueryClient: mocks.QueryClient,
    QueryClientProvider: mocks.QueryClientProvider,
  };
});

describe('Providers', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Calls QueryClient with expected config', async () => {
    const { Providers } = await import('./Providers');

    render(
      <Providers>
        <></>
      </Providers>,
    );
    expect(mocks.QueryClient).toHaveBeenCalledOnce();
    expect(mocks.QueryClient).toHaveBeenCalledWith({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  });

  it('Calls QueryClientProvider with expected client', async () => {
    const { Providers } = await import('./Providers');

    render(
      <Providers>
        <></>
      </Providers>,
    );

    expect(mocks.QueryClientProvider).toHaveBeenCalledTimes(1);

    const dataClient = screen
      .getByTestId('query-client-provider')
      .getAttribute('data-client');
    expect(dataClient).toBeDefined();

    expect(dataClient).toEqual(
      JSON.stringify({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
    );
  });

  it('Renders children', async () => {
    const { Providers } = await import('./Providers');
    const childContent = 'test content';

    render(
      <Providers>
        <span>{childContent}</span>
      </Providers>,
    );
    const providerElement = screen.getByTestId('query-client-provider');
    expect(providerElement).toBeInTheDocument();
    expect(providerElement).toHaveTextContent(childContent);
  });
});

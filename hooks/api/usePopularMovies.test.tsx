import { ReactNode } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { usePopularMovies } from './usePopularMovies';

const mockPopularMovies = [
  { id: 1, title: 'Movie 1' },
  { id: 2, title: 'Movie 2' },
];

const mocks = vi.hoisted(() => ({
  fetchQuery: vi.fn(
    () => () => Promise.resolve({ results: mockPopularMovies }),
  ),
}));

vi.mock('@/hooks/api/base', async (actual) => ({
  ...((await actual()) as any),
  fetchQuery: mocks.fetchQuery,
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('usePopularMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test('should return an empty array initially', () => {
    const { result } = renderHook(() => usePopularMovies({}), {
      wrapper: createWrapper(),
    });

    expect(result.current.popularMovies).toEqual([]);
  });

  test('should fetch popular movies data', async () => {
    const { result } = renderHook(() => usePopularMovies({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.popularMovies).toEqual(mockPopularMovies);
  });

  test('should call fetchQuery properly with default page', async () => {
    const { result } = renderHook(() => usePopularMovies({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(mocks.fetchQuery).toHaveBeenCalledWith({
      url: '/api/movies/popular',
      method: 'GET',
      params: new URLSearchParams('page=1'),
    });
  });

  test('should call fetchQuery properly with custom page', async () => {
    const customPage = 3;
    const { result } = renderHook(
      () => usePopularMovies({ page: customPage }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => result.current.isSuccess);

    expect(mocks.fetchQuery).toHaveBeenCalledWith({
      url: '/api/movies/popular',
      method: 'GET',
      params: new URLSearchParams(`page=${customPage}`),
    });
  });
});

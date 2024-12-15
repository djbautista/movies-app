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
  Axios: vi.fn(() =>
    Promise.resolve({
      data: { results: mockPopularMovies, page: 1, total_pages: 2 },
    }),
  ),
}));

vi.mock('axios', async (actual) => ({
  ...((await actual()) as any),
  default: mocks.Axios,
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
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    });

    expect(result.current.popularMovies).toEqual([]);
  });

  test('should fetch popular movies data', async () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => result.current.isSuccess);

    expect(result.current.popularMovies).toEqual(mockPopularMovies);
  });

  test('should call Axios properly with default page', async () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => result.current.isSuccess);

    expect(mocks.Axios).toHaveBeenCalledWith({
      url: '/api/movies/popular?page=1',
    });
  });

  test('should has next page', async () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => result.current.isSuccess);

    expect(result.current.hasNextPage).toBe(true);
  });

  test('should call Axios properly with next page', async () => {
    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => result.current.isSuccess);

    result.current.fetchNextPage();

    await waitFor(() => !result.current.isLoading);
    await waitFor(() => result.current.isSuccess);

    expect(mocks.Axios).toHaveBeenCalledWith({
      url: '/api/movies/popular?page=2',
    });
  });
});

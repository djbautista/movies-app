import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginatedPage, Queries } from '@/hooks/api/base';
import { Movie } from '@/models/Movie';
import Axios, { AxiosResponse } from 'axios';
import { useCallback, useRef } from 'react';

const fetchPopularMovies = async ({ pageParam }: { pageParam: number }) => {
  const response = (await Axios({
    url: `/api/movies/popular?page=${pageParam}`,
  })) as AxiosResponse<PaginatedPage<Movie>>;

  return response.data;
};

export const usePopularMovies = () => {
  const observer = useRef<IntersectionObserver | null>(null);

  const query = useInfiniteQuery({
    queryKey: [Queries.PopularMovies],
    queryFn: fetchPopularMovies,
    initialPageParam: 1,
    getNextPageParam: ({ page, total_pages }) =>
      page < total_pages ? page + 1 : undefined,
  });

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = query;

  const popularMovies = data?.pages.flatMap((page) => page.results) ?? [];

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (query.isLoading || query.isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isFetching],
  );

  return {
    popularMovies,
    lastMovieElementRef,
    ...query,
  };
};

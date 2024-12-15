import { useQuery } from '@tanstack/react-query';

import { PaginatedPage, Queries, fetchQuery } from '@/hooks/api/base';
import { Movie } from '@/models/Movie';

interface UsePopularMoviesProps {
  page?: number;
}

export const usePopularMovies = ({ page = 1 }: UsePopularMoviesProps = {}) => {
  const params = new URLSearchParams({ page: page.toString() });

  const query = useQuery({
    queryKey: [Queries.PopularMovies, page],
    queryFn: fetchQuery<PaginatedPage<Movie>>({
      url: '/api/movies/popular',
      method: 'GET',
      params,
    }),
    select: (data) => data.results,
  });

  return { ...query, popularMovies: query.data ?? [] };
};

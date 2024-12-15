import { useQuery } from '@tanstack/react-query';
import { PaginatedPage, Queries } from '@/hooks/api/base';
import { Movie } from '@/models/Movie';
import Axios, { AxiosResponse } from 'axios';
import { useCallback, useRef } from 'react';

interface UsePopularMoviesProps {
  id: string;
}

const fetchMovieDetails = async ({ id }: UsePopularMoviesProps) => {
  const response = (await Axios({
    url: `/api/movies/${id}`,
  })) as AxiosResponse<Movie>;

  return response.data;
};

export const useMovieDetails = ({ id }: UsePopularMoviesProps) => {
  const query = useQuery({
    queryKey: [Queries.MovieDetails, { id }],
    queryFn: () => fetchMovieDetails({ id }),
  });

  return {
    movieDetails: query.data,
    ...query,
  };
};

'use client';

import { usePopularMovies } from '@/hooks/api/usePopularMovies';

export default function Home() {
  const { popularMovies } = usePopularMovies();

  return <></>;
}

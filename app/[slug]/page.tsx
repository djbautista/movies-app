'use client';

import { use } from 'react';

import { useMovieDetails } from '@/hooks/api';

export default function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const id = slug.split('-')[0];

  const { movieDetails } = useMovieDetails({ id });

  return <></>;
}

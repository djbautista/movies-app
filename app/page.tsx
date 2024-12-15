'use client';

import { usePopularMovies } from '@/hooks/api/usePopularMovies';
import { PosterImage } from '@/components/PosterImage';

export default function Home() {
  const { popularMovies, lastMovieElementRef } = usePopularMovies();

  return (
    <div className="min-h-screen">
      <main>
        <div className="grid grid-cols-2">
          {popularMovies.map((movie, index) => (
            <PosterImage
              key={`${index}_${movie.id}`}
              movie={movie}
              ref={
                index === popularMovies.length - 1
                  ? lastMovieElementRef
                  : undefined
              }
              priority={index < 4}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

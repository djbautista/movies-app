'use client';

import Link from 'next/link';

import { Header } from '@/components/Header';
import { PosterImage } from '@/components/PosterImage';
import { usePopularMovies } from '@/hooks/api/usePopularMovies';
import { generateMovieSlug } from '@/utils';

export default function Home() {
  const { popularMovies, lastMovieElementRef } = usePopularMovies();

  return (
    <div className="min-h-screen">
      <Header className="sticky top-0">Pop Movies</Header>
      <main>
        <div className="grid grid-cols-2">
          {popularMovies.map(({ id, title, ...movie }, index) => {
            const slug = generateMovieSlug({ id, title });
            return (
              <Link
                key={`${index}-${slug}`}
                href={`/${slug}`}
                aria-label={title}
              >
                <PosterImage
                  movie={{ id, title, ...movie }}
                  ref={
                    index === popularMovies.length - 1
                      ? lastMovieElementRef
                      : undefined
                  }
                  priority={index < 4}
                />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

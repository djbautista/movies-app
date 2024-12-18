'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { PosterImage } from '@/components/PosterImage';
import { usePopularMovies } from '@/hooks/api/usePopularMovies';
import { generateMovieSlug } from '@/utils';

import styles from './page.module.scss';

export default function HomePage() {
  const { popularMovies, lastMovieElementRef, isLoading } = usePopularMovies();

  return (
    <div className={styles.page}>
      <Header backHref="/" className={styles.page__header}>
        Pop Movies
      </Header>
      <main className={styles.page__main}>
        <div className={styles.page__grid}>
          {popularMovies.map(({ id, title, ...movie }, index) => {
            const slug = generateMovieSlug({ id, title });
            return (
              <Link
                key={`${index}-${slug}`}
                href={`/${slug}`}
                aria-label={title}
                className={styles.page__link}
              >
                <PosterImage
                  movie={{ id, title, ...movie }}
                  ref={
                    index === popularMovies.length - 1
                      ? lastMovieElementRef
                      : undefined
                  }
                  priority={index < 4}
                  className={styles.page__poster}
                />
              </Link>
            );
          })}
        </div>
        {isLoading && (
          <div className={styles.page__loadingContainer}>
            <Loading className={styles.page__loading} />
          </div>
        )}
      </main>
    </div>
  );
}

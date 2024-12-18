'use client';

import { use } from 'react';
import { PiPlayCircleThin } from 'react-icons/pi';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { PosterImage } from '@/components/PosterImage';
import { useMovieDetails } from '@/hooks/api';
import { useFavoriteMovie } from '@/hooks/useFavoriteMovie';

import styles from './page.module.scss';

export default function Movie({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const id = slug.split('-')[0];

  const { movieDetails } = useMovieDetails({ id });

  const { title, overview, release_date, runtime, vote_average } =
    movieDetails || {};

  const [year] = release_date?.split('-') || [];
  const parsedVoteAverage = vote_average ? vote_average.toFixed(1) : '';

  const {
    isFavorite,
    isLoading: isFavoriteLoading,
    toggleFavorite,
  } = useFavoriteMovie({ id });

  return (
    <div className={styles.page}>
      <Header backHref="/" className={styles['page__header']}>
        Movie details
      </Header>
      <main>
        {movieDetails ? (
          <>
            <div className={styles['page__title-section']}>
              <h2>{title}</h2>
            </div>
            <div className={styles['page__content']}>
              <div className={styles['page__details']}>
                <PosterImage
                  movie={movieDetails}
                  className={styles['page__details-poster']}
                />
                <div className={styles['page__details-info']}>
                  <div className={styles['page__year']}>{year}</div>
                  <div className={styles['page__runtime']}>{runtime} mins</div>
                  <div className={styles['page__rating']}>
                    {parsedVoteAverage}/10
                  </div>
                  {!isFavoriteLoading ? (
                    <Button
                      className={styles['page__button']}
                      onClick={toggleFavorite}
                    >
                      {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
                    </Button>
                  ) : (
                    <div>Loading favorites...</div>
                  )}
                </div>
              </div>
              <p className={styles['page__overview']}>{overview}</p>
              <div className={styles['page__trailers']}>
                <div>
                  <h3>TRAILERS</h3>
                  <hr />
                </div>
                <div className={styles['page__trailers-list']}>
                  <Button
                    className={styles['page__trailers-button']}
                    variant="neutral"
                  >
                    <PiPlayCircleThin className={styles['page__icon']} />
                    <span className={styles['page__text']}>Play trailer 1</span>
                  </Button>
                  <Button
                    className={styles['page__trailers-button']}
                    variant="neutral"
                  >
                    <PiPlayCircleThin className={styles['page__icon']} />
                    <span className={styles['page__text']}>Play trailer 2</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles['page__loading-container']}>
            <Loading className={styles['page__border-neutral']} />
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { use } from 'react';
import { PiPlayCircleThin } from 'react-icons/pi';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Loading } from '@/components/Loading';
import { PosterImage } from '@/components/PosterImage';
import { useMovieDetails } from '@/hooks/api';
import { useFavoriteMovie } from '@/hooks/useFavoriteMovie';

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
    <div className="min-h-screen bg-white">
      <Header backHref="/" className="sticky top-0">
        Movie details
      </Header>
      <main>
        {movieDetails ? (
          <>
            <div className="bg-primary p-4">
              <h2 className="text-xl font-medium text-white">{title}</h2>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex gap-4">
                <PosterImage
                  movie={movieDetails}
                  className="box-content max-h-[170px] w-[115px] flex-shrink-0 rounded-sm border-none"
                />
                <div className="w-full">
                  <div className="text-xl">{year}</div>
                  <div className="text-sm/semi-loose italic text-secondary">
                    {runtime} mins
                  </div>
                  <div className="mb-4 mt-6 text-sm font-bold">
                    {parsedVoteAverage}/10
                  </div>
                  {!isFavoriteLoading ? (
                    <Button className="text-center" onClick={toggleFavorite}>
                      {isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}
                    </Button>
                  ) : (
                    <div>Loading favorites...</div>
                  )}
                </div>
              </div>
              <p className="text-sm/semi-loose font-medium text-neutral">
                {overview}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="w-full text-sm/semi-loose font-medium text-neutral">
                    TRAILERS
                  </h3>
                  <hr className="mt-[3px] border-neutral-300" />
                </div>
                <div className="space-y-2">
                  <Button
                    className="flex items-center gap-4 p-4"
                    variant="neutral"
                  >
                    <PiPlayCircleThin className="h-6 w-6" />
                    <span className="text-gray-400">Play trailer 1</span>
                  </Button>
                  <Button
                    className="flex items-center gap-4 p-4"
                    variant="neutral"
                  >
                    <PiPlayCircleThin className="h-6 w-6" />
                    <span className="text-gray-400">Play trailer 2</span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="fixed top-0 flex min-h-screen w-full items-center justify-center">
            <Loading className="border-neutral-900" />
          </div>
        )}
      </main>
    </div>
  );
}

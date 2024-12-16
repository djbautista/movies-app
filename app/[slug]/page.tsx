'use client';

import { use } from 'react';
import { PiPlayCircleThin } from 'react-icons/pi';

import { PosterImage } from '@/components/PosterImage';
import { useMovieDetails } from '@/hooks/api';

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

  return (
    <div className="min-h-screen bg-white">
      <main>
        {movieDetails ? (
          <>
            <div className="bg-[#746A64] p-6">
              <h1 className="text-xl font-medium text-white">{title}</h1>
            </div>
            <div className="space-y-6 p-6">
              <div className="flex gap-4">
                <PosterImage
                  movie={movieDetails}
                  className="box-content max-h-[170px] w-[115px] flex-shrink-0 rounded-sm border-none"
                />
                <div className="w-full">
                  <div className="text-xl">{year}</div>
                  <div className="text-sm/semi-loose italic text-[#212121]">
                    {runtime} mins
                  </div>
                  <div className="mb-4 mt-6 text-sm font-bold">
                    {parsedVoteAverage}/10
                  </div>
                  <button className="w-full rounded-sm bg-[#746A64] px-6 py-4 text-center font-medium text-white">
                    Add to Favorite
                  </button>
                </div>
              </div>
              <p className="text-sm/semi-loose font-medium text-[#757575]">
                {overview}
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm/semi-loose w-full font-medium text-[#757575]">
                    TRAILERS
                  </h3>
                  <hr className="mt-[3px] border-[#DEDEDE]" />
                </div>
                <div className="space-y-4">
                  <button className="flex w-full items-center gap-4 rounded-lg bg-[#F5F5F5]/5 p-4">
                    <PiPlayCircleThin className="h-6 w-6" />
                    <span className="text-gray-400">Play trailer 1</span>
                  </button>
                  <button className="flex w-full items-center gap-4 rounded-lg bg-[#F5F5F5]/5 p-4">
                    <PiPlayCircleThin className="h-6 w-6" />
                    <span className="text-gray-400">Play trailer 2</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  );
}

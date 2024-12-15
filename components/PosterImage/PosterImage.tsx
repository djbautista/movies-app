import React from 'react';

import Image, { ImageProps } from 'next/image';
import { Movie } from '@/models/Movie';
import { twMerge } from 'tailwind-merge';

interface PosterImageProps extends Partial<ImageProps> {
  movie: Movie;
}

export const getPosterImageClassName = ({
  className,
}: Pick<PosterImageProps, 'className'>) => {
  return twMerge([
    'aspect-[2/3] w-full',
    'object-cover',
    'box-border border border-black',
    className,
  ]);
};

export const PosterImage = React.forwardRef<HTMLImageElement, PosterImageProps>(
  ({ className, movie: { poster_path, title }, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        alt={title}
        width={500}
        height={750}
        sizes="(max-width: 768px) 50vw, 33vw"
        src={`/movies/posterImages/w185${poster_path}`}
        className={getPosterImageClassName({ className })}
        {...props}
      />
    );
  },
);

export default PosterImage;

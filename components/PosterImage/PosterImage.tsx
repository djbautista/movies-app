'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { ServerPosterImage, ServerPosterImageProps } from './ServerPosterImage';

type PosterImageProps = ServerPosterImageProps;

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

export const PosterImage = React.forwardRef<HTMLDivElement, PosterImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={className}>
        <ServerPosterImage
          className={getPosterImageClassName({ className })}
          {...props}
        />
      </div>
    );
  },
);

PosterImage.displayName = 'PosterImage';

export default PosterImage;

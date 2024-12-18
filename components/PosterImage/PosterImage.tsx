'use client';

import React from 'react';
import clsx from 'clsx';

import styles from './posterImage.module.scss';
import { ServerPosterImage, ServerPosterImageProps } from './ServerPosterImage';

export type PosterImageProps = ServerPosterImageProps;

export const PosterImage = React.forwardRef<HTMLDivElement, PosterImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.posterImage, className)}>
        <ServerPosterImage className={clsx(styles['posterImage__img'], className)} {...props} />
      </div>
    );
  },
);

PosterImage.displayName = 'PosterImage';

export default PosterImage;

import Image, { ImageProps } from 'next/image';
import { Movie } from '@/models/Movie';

export interface ServerPosterImageProps extends Partial<ImageProps> {
  movie: Movie;
}

export const ServerPosterImage = ({
  movie,
  priority = false,
  className,
}: ServerPosterImageProps) => {
  const { poster_path, title } = movie;
  const smallImageUrl = `/movies/posters/w92${poster_path}`;
  const largeImageUrl = `/movies/posters/w300${poster_path}`;

  return (
    <Image
      alt={title}
      width={200}
      height={300}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      src={largeImageUrl}
      className={className}
      priority={priority}
      blurDataURL={smallImageUrl}
    />
  );
};

export default ServerPosterImage;

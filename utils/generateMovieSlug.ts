import { Movie } from '@/models/Movie';

export const generateMovieSlug = ({
  id,
  title,
}: Pick<Movie, 'id' | 'title'>) => {
  return id + '-' + title.toLowerCase().replace(/ /g, '-');
};

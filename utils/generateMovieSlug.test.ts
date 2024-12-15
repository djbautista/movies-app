import { generateMovieSlug } from '@/utils/generateMovieSlug';
import { describe, expect, it } from 'vitest';

describe('generateMovieSlug', () => {
  it('Generates a slug from a movie id and title', () => {
    const movie = {
      id: 1,
      title: 'Matrix',
    };
    const slug = generateMovieSlug(movie);
    expect(slug).toBe('1-matrix');
  });

  it('Generates a slug from a movie id and title with multiple words', () => {
    const movie = {
      id: 1,
      title: 'The Matrix Reloaded',
    };
    const slug = generateMovieSlug(movie);
    expect(slug).toBe('1-the-matrix-reloaded');
  });

  it('Generates a slug from a movie id and title with special characters', () => {
    const movie = {
      id: 1,
      title: 'The Matrix: Reloaded',
    };
    const slug = generateMovieSlug(movie);
    expect(slug).toBe('1-the-matrix:-reloaded');
  });
});

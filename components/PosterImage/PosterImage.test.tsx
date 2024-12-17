import { beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

import { PosterImage } from './PosterImage';
import styles from './posterImage.module.scss';

const mocks = vi.hoisted(() => ({
  ServerPosterImage: vi.fn(({ movie, ...props }) => (
    <img {...props} data-movie={JSON.stringify(movie)} data-testid="image" />
  )),
}));

vi.mock('./ServerPosterImage', async (actual) => ({
  ...((await actual()) as any),
  ServerPosterImage: mocks.ServerPosterImage,
}));

describe('PosterImage', () => {
  const mockMovie = {
    poster_path: '/mock-poster.jpg',
    title: 'Mock Movie',
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('Renders the image with the movie prop', () => {
    const { getByTestId } = render(<PosterImage movie={mockMovie as any} />);
    const imgElement = getByTestId('image');

    expect(imgElement).toBeInTheDocument();

    const movieData = JSON.parse(imgElement.getAttribute('data-movie')!);

    expect(movieData).toEqual(mockMovie);
  });
});

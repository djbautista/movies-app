import { twMerge } from 'tailwind-merge';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { getPosterImageClassName, PosterImage } from './PosterImage';

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

  const defaultProps = {
    alt: mockMovie.title,
    width: '500',
    height: '750',
    src: `/movies/posters/w300${mockMovie.poster_path}`,
    className: 'test-class',
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
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

  test('Has the proper classnames', () => {
    const expectedClasses = [
      'aspect-[2/3] w-full',
      'object-cover',
      'box-border border border-black',
      'custom-class',
    ];

    render(<PosterImage movie={mockMovie as any} className="custom-class" />);

    const image = screen.getByTestId('image');
    const generatedClasses = getPosterImageClassName({
      className: 'custom-class',
    });

    expect(generatedClasses).toBe(twMerge(expectedClasses));
    expect(image.className).toBe(generatedClasses);
  });
});

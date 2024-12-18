import { beforeEach, describe, expect, test, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { ServerPosterImage } from './ServerPosterImage';

const mocks = vi.hoisted(() => ({
  Image: vi.fn((props) => <img {...props} data-testid="image" />),
}));

vi.mock('next/image', async (actual) => ({
  ...((await actual()) as any),
  default: mocks.Image,
}));

describe('ServerPosterImage', () => {
  const mockMovie = {
    poster_path: '/mock-poster.jpg',
    title: 'Mock Movie',
  };

  const defaultProps = {
    alt: mockMovie.title,
    width: '500',
    height: '750',
    src: `/movies/posters/w300${mockMovie.poster_path}`,
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('Renders the image with the movie prop', () => {
    const { getByTestId } = render(
      <ServerPosterImage movie={mockMovie as any} />,
    );
    const imgElement = getByTestId('image');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', defaultProps.alt);
    expect(imgElement).toHaveAttribute('src', defaultProps.src);
  });

  test('Has the right width and height props', () => {
    render(<ServerPosterImage movie={mockMovie as any} />);

    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute('width', defaultProps.width);
    expect(image).toHaveAttribute('height', defaultProps.height);
    expect(image).toHaveAttribute('sizes', defaultProps.sizes);
  });

  test('Has the proper classnames', () => {
    render(
      <ServerPosterImage movie={mockMovie as any} className="custom-class" />,
    );

    const image = screen.getByTestId('image');

    expect(image.className).toBe('custom-class');
  });
});

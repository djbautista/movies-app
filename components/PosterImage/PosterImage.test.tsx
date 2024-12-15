import { beforeEach, describe, expect, test, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { PosterImage, getPosterImageClassName } from './PosterImage';
import { twMerge } from 'tailwind-merge';

const mocks = vi.hoisted(() => ({
  Image: vi.fn((props) => <img {...props} data-testid="image" />),
}));

vi.mock('next/image', async (actual) => ({
  ...((await actual()) as any),
  default: mocks.Image,
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
    src: `/movies/posterImages/w185${mockMovie.poster_path}`,
    className:
      'box-border aspect-[2/3] w-full border border-black object-cover',
    sizes: '(max-width: 768px) 50vw, 33vw',
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('Renders the image with the movie prop', () => {
    const { getByTestId } = render(<PosterImage movie={mockMovie as any} />);
    const imgElement = getByTestId('image');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('alt', defaultProps.alt);
    expect(imgElement).toHaveAttribute('src', defaultProps.src);
  });

  test('Has the right width and height props', () => {
    render(<PosterImage movie={mockMovie as any} />);

    const image = screen.getByTestId('image');

    expect(image).toHaveAttribute('width', defaultProps.width);
    expect(image).toHaveAttribute('height', defaultProps.height);
    expect(image).toHaveAttribute('sizes', defaultProps.sizes);
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

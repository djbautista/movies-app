import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';

import Home from './page';

const mocks = vi.hoisted(() => ({
  Link: vi.fn(({ href, children, ...props }) => (
    <a data-testid="link" href={href} {...props}>
      {children}
    </a>
  )),

  Header: vi.fn(({ children, ...props }) => (
    <header data-testid="header" {...props}>
      {children}
    </header>
  )),

  PosterImage: vi.fn((props, ref) => {
    const { movie } = props;
    return <img data-testid="poster-image" alt={movie.title} ref={ref} />;
  }),

  usePopularMovies: vi.fn(() => ({
    popularMovies: [
      { id: 1, title: 'Movie One', poster_path: '/poster1.jpg' },
      { id: 2, title: 'Movie Two', poster_path: '/poster2.jpg' },
      { id: 3, title: 'Movie Three', poster_path: '/poster3.jpg' },
    ],
    lastMovieElementRef: vi.fn(),
  })),

  generateMovieSlug: vi.fn(
    ({ id, title }) => `${id}-${title.toLowerCase().replace(/\s+/g, '-')}`,
  ),
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: mocks.Link,
}));

vi.mock('@/components/Header', () => ({
  Header: mocks.Header,
}));

vi.mock('@/components/PosterImage', () => ({
  PosterImage: React.forwardRef((props, ref) => mocks.PosterImage(props, ref)),
}));

vi.mock('@/hooks/api/usePopularMovies', () => ({
  usePopularMovies: mocks.usePopularMovies,
}));

vi.mock('@/utils', () => ({
  generateMovieSlug: mocks.generateMovieSlug,
}));

describe('Home Page', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the home page with a header, main section, and a list of movies', () => {
    render(<Home />);

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Pop Movies');

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();

    const popularMovies = mocks.usePopularMovies().popularMovies;
    expect(popularMovies.length).toBe(3);

    expect(mocks.generateMovieSlug).toHaveBeenCalledTimes(popularMovies.length);
    popularMovies.forEach((movie) => {
      expect(mocks.generateMovieSlug).toHaveBeenCalledWith({
        id: movie.id,
        title: movie.title,
      });
    });

    const links = screen.getAllByTestId('link');
    expect(links).toHaveLength(popularMovies.length);

    popularMovies.forEach((movie, index) => {
      const expectedSlug = mocks.generateMovieSlug({
        id: movie.id,
        title: movie.title,
      });
      expect(links[index]).toHaveAttribute('href', `/${expectedSlug}`);
      expect(links[index]).toHaveAttribute('aria-label', movie.title);
    });

    expect(mocks.PosterImage).toHaveBeenCalledTimes(popularMovies.length);

    popularMovies.forEach((movie, index) => {
      const callProps = mocks.PosterImage.mock.calls[index][0];
      expect(callProps.movie).toEqual(movie);
      expect(callProps.priority).toBe(index < 4);

      if (index === popularMovies.length - 1) {
        const callRef = mocks.PosterImage.mock.calls[index][1];
        expect(callRef).toBeDefined();
      } else {
        const callRef = mocks.PosterImage.mock.calls[index][1];
        expect(callRef).toBeNull();
      }
    });

    const posterImages = screen.getAllByTestId('poster-image');
    expect(posterImages).toHaveLength(popularMovies.length);
    popularMovies.forEach((movie, index) => {
      expect(posterImages[index]).toHaveAttribute('alt', movie.title);
    });
  });
});

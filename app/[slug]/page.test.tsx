import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, cleanup, act } from '@testing-library/react';
import React from 'react';

import Movie from './page';

const mocks = vi.hoisted(() => ({
  Header: vi.fn(({ children, ...props }) => (
    <header data-testid="header" {...props}>
      {children}
    </header>
  )),
  PosterImage: vi.fn((props) => {
    const { movie, className } = props;
    return (
      <img
        data-testid="poster-image"
        alt={movie?.title || 'Unknown'}
        className={className}
      />
    );
  }),
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="button" {...props}>
      {children}
    </button>
  )),
  useMovieDetails: vi.fn(),
}));

vi.mock('@/components/Header', () => ({
  Header: mocks.Header,
}));

vi.mock('@/components/Loading', () => ({
  Loading: () => <div>Loading...</div>,
}));

vi.mock('@/components/PosterImage', () => ({
  PosterImage: mocks.PosterImage,
}));

vi.mock('@/components/Button', () => ({
  Button: mocks.Button,
}));

vi.mock('@/hooks/api', () => ({
  useMovieDetails: mocks.useMovieDetails,
}));

describe('Movie Page', () => {
  const mockMovieDetails = {
    title: 'My Movie',
    overview: 'A great movie.',
    release_date: '2020-05-20',
    runtime: 120,
    vote_average: 7.235,
    poster_path: '/mock-poster.jpg',
    id: '123',
  };

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders loading state when movieDetails is not yet available', async () => {
    mocks.useMovieDetails.mockReturnValue({ movieDetails: undefined });

    await act(async () => {
      render(<Movie params={Promise.resolve({ slug: '123-my-movie' })} />);
    });

    expect(mocks.useMovieDetails).toHaveBeenCalledWith({ id: '123' });

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(screen.queryByTestId('poster-image')).not.toBeInTheDocument();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });

  it('renders the movie details once available', async () => {
    mocks.useMovieDetails.mockReturnValue({ movieDetails: mockMovieDetails });

    await act(async () => {
      render(<Movie params={Promise.resolve({ slug: '123-my-movie' })} />);
    });

    expect(mocks.useMovieDetails).toHaveBeenCalledWith({ id: '123' });

    const header = screen.getByTestId('header');
    expect(header).toHaveTextContent('Movie details');

    expect(screen.getByText('My Movie')).toBeInTheDocument();

    expect(mocks.PosterImage).toHaveBeenCalledTimes(1);
    const posterImageProps = mocks.PosterImage.mock.calls[0][0];
    expect(posterImageProps.movie).toEqual(mockMovieDetails);
    expect(posterImageProps.className).toContain('max-h-[170px]');

    const year = mockMovieDetails.release_date.split('-')[0];
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovieDetails.runtime} mins`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMovieDetails.vote_average.toFixed(1)}/10`),
    ).toBeInTheDocument();

    expect(screen.getByText(mockMovieDetails.overview)).toBeInTheDocument();

    const buttons = screen.getAllByTestId('button');
    expect(buttons.length).toBeGreaterThan(0);

    expect(screen.getByText('Add to Favorite')).toBeInTheDocument();

    const trailerButton1 = screen.getByText('Play trailer 1');
    const trailerButton2 = screen.getByText('Play trailer 2');
    expect(trailerButton1).toBeInTheDocument();
    expect(trailerButton2).toBeInTheDocument();

    expect(screen.getByText('TRAILERS')).toBeInTheDocument();
  });

  it('displays the correct data based on movieDetails', async () => {
    const customMovieDetails = {
      ...mockMovieDetails,
      title: 'Another Movie',
      overview: 'Another great movie.',
      release_date: '2019-01-01',
      runtime: 90,
      vote_average: 9.512,
    };

    mocks.useMovieDetails.mockReturnValue({ movieDetails: customMovieDetails });

    await act(async () => {
      render(<Movie params={Promise.resolve({ slug: '123-another-movie' })} />);
    });

    expect(mocks.useMovieDetails).toHaveBeenCalledWith({ id: '123' });

    const year = customMovieDetails.release_date.split('-')[0];
    expect(screen.getByText('Another Movie')).toBeInTheDocument();
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(
      screen.getByText(`${customMovieDetails.runtime} mins`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${customMovieDetails.vote_average.toFixed(1)}/10`),
    ).toBeInTheDocument();
    expect(screen.getByText(customMovieDetails.overview)).toBeInTheDocument();
  });
});

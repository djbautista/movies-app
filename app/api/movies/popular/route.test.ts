// @vitest-environment node

import { describe, it, expect, beforeEach, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    fetch: vi.fn(),
    API_URL: 'https://api.example.com',
    ACCESS_TOKEN: 'mock-access-token',
  };
});

vi.stubEnv('TMDB_API_URL', mocks.API_URL);
vi.stubEnv('TMDB_ACCESS_TOKEN', mocks.ACCESS_TOKEN);

describe('GET route', () => {
  global.fetch = mocks.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return data when the external API responds with OK status', async () => {
    const { GET } = await import('./route');

    const mockData = { results: [{ id: 1, title: 'Movie Title' }] };

    mocks.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
      status: 200,
    } as Response);

    const requestUrl = `${mocks.API_URL}/?language=en-US&page=1`;
    const request = new Request(requestUrl, { method: 'GET' });
    const response = await GET(request);

    expect(mocks.fetch).toHaveBeenCalledOnce();
    expect(mocks.fetch).toHaveBeenCalledWith(
      `${mocks.API_URL}/movie/popular?language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${mocks.ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockData);
  });

  it('should return an error response when the external API responds with a non-OK status', async () => {
    const { GET } = await import('./route');

    const errorMessage = 'Some error occurred';

    mocks.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ status_message: errorMessage }),
    } as Response);

    const request = new Request(`${mocks.API_URL}/?query=unknown`, {
      method: 'GET',
    });
    const response = await GET(request);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(404);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({
      status: 404,
      message: errorMessage,
    });
  });

  it('should return a 500 Internal Server Error when an exception is thrown', async () => {
    const { GET } = await import('./route');

    mocks.fetch.mockRejectedValueOnce(new Error('Network Error'));

    const request = new Request(`${mocks.API_URL}/`, { method: 'GET' });
    const response = await GET(request);

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(response.status).toBe(500);

    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ error: 'Internal Server Error' });
  });
});

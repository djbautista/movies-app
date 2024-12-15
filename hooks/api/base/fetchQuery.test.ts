import { describe, expect, it, vi } from 'vitest';
import { fetchQuery } from './fetchQuery';

const mocks = vi.hoisted(() => ({
  axios: vi.fn(() => Promise.resolve({ data: 'test' })),
}));

vi.mock('axios', () => ({
  default: mocks.axios,
}));

describe('fetchQuery', () => {
  it('should call axios', async () => {
    await fetchQuery({ url: 'test' })();

    expect(mocks.axios).toHaveBeenCalledWith({ url: 'test' });
  });

  it('should return data', async () => {
    const result = await fetchQuery({ url: 'test' })();

    expect(result).toEqual('test');
  });
});

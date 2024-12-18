import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, cleanup, waitFor } from '@testing-library/react';
import { useFavoriteMovie } from './useFavoriteMovie';


describe('useFavoriteMovie', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should return default values if no id is provided', async () => {
    const { result } = renderHook(() => useFavoriteMovie({ id: '' }));

    await waitFor(() => !result.current.isLoading);

    expect(result.current.isFavorite).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle a non-favorite movie (not found in DB)', async () => {
    const { result } = renderHook(() =>
      useFavoriteMovie({ id: '123' }),
    );

    await waitFor(() => !result.current.isLoading);

    expect(result.current.isFavorite).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);

  });

  it('should handle a favorite movie (found in DB)', async () => {
    await new Promise<void>((resolve) => {
      const request = indexedDB.open('favoritesDB', 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore('favorites', { keyPath: 'movieId' });
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('favorites', 'readwrite');
        const store = tx.objectStore('favorites');
        store.put({ movieId: '456', isFavorite: true });
        tx.oncomplete = () => resolve();
      };
    });


    const { result } = renderHook(() =>
      useFavoriteMovie({ id: '456' }),
    );

    await waitFor(() => !result.current.isError);
    await waitFor(() => !result.current.isLoading);

    expect(result.current.isFavorite).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should handle a favorite movie (found in DB but not favorite)', async () => {
    await new Promise<void>((resolve) => {
      const request = indexedDB.open('favoritesDB', 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore('favorites', { keyPath: 'movieId' });
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction('favorites', 'readwrite');
        const store = tx.objectStore('favorites');
        store.put({ movieId: '456', isFavorite: false });
        tx.oncomplete = () => resolve();
      };
    });


    const { result } = renderHook(() =>
      useFavoriteMovie({ id: '456' }),
    );

    await waitFor(() => !result.current.isError);
    await waitFor(() => !result.current.isLoading);

    expect(result.current.isFavorite).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});

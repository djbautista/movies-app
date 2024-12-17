import { useEffect, useState } from 'react';

export const useFavoriteMovie = ({ id }: { id: string }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('favoritesDB', 1);
      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'movieId' });
        }
      };
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(request.error);
      };
    });
  };

  const getFavoriteValue = async (movieId: string) => {
    const db = await openDB();
    return new Promise<boolean>((resolve, reject) => {
      const tx = db.transaction('favorites', 'readonly');
      const store = tx.objectStore('favorites');
      const getRequest = store.get(movieId);
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result) {
          resolve(result.isFavorite);
        } else {
          resolve(false);
        }
      };
      getRequest.onerror = () => {
        reject(getRequest.error);
      };
    });
  };

  const setFavoriteValue = async (movieId: string, value: boolean) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction('favorites', 'readwrite');
      const store = tx.objectStore('favorites');
      store.put({ movieId, isFavorite: value });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  };

  useEffect(() => {
    if (!id) return;

    getFavoriteValue(id)
      .then((value) => {
        setIsFavorite(value);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.error('Error retrieving favorite status:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [id]);

  const toggleFavorite = async () => {
    try {
      await setFavoriteValue(id, !isFavorite);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return {
    isFavorite,
    isLoading,
    isError,
    toggleFavorite,
  };
};

import { useCallback } from 'react';

export const useSubmit = (apiUrl) =>
  useCallback(
    async (data) => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Помилка відправки даних');
      }
      return await response.json();
    },
    [apiUrl]
  );

import { useState, useCallback } from 'react';

export function useErrorHandler(): {
  handleError: (error: unknown) => void;
  error: Error | null;
  resetError: () => void;
} {
  const [error, setError] = useState<Error | null>(null);

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error(String(error)));
      }
    },
    [setError],
  );

  const resetError = useCallback(() => {
    setError(null);
  }, [setError]);

  if (error) {
    throw error;
  }

  return { handleError, error: null, resetError };
}

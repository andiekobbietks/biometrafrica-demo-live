import { useState, useCallback } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

      const response = await fetch('/api/authenticate', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`);
      }

      setIsAuthenticated(true);
    } catch (err) {
      setError(
        err.name === 'AbortError'
          ? 'Authentication timed out. Please try again.'
          : 'Authentication failed. Please check your connection and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retry = () => {
    setError(null);
    authenticate();
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    authenticate,
    retry
  };
};

export default useAuth;

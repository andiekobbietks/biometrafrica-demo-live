import { useState } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsAuthenticated(true);
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

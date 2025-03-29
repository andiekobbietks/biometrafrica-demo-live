import React from 'react';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4" role="alert">
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      <p>{message}</p>
    </div>
    {onRetry && (
      <button 
        onClick={onRetry} 
        className="mt-2 text-sm underline hover:text-red-800 focus:ring-2 focus:outline-none focus:ring-red-300"
        aria-label="Try again"
      >
        Try again
      </button>
    )}
  </div>
);

export default ErrorMessage;

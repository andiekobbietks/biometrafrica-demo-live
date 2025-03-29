import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressIndicator from './ProgressIndicator';
import ErrorMessage from './ErrorMessage';
import PrivacyControls from './PrivacyControls';
import useAuth from '../hooks/useAuth';

const BioMetrAfriCaRevolutionaryDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const { isAuthenticated, isLoading, error, authenticate, retry } = useAuth();
  
  const totalSteps = 4;

  const handlePrivacySettingsSave = (settings) => {
    console.log('Privacy settings saved:', settings);
    // Implement logic to save settings
    setShowPrivacySettings(false);
  };

  const handleContinue = () => {
    if (currentStep === totalSteps) {
      authenticate();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
      
      {error && <ErrorMessage message={error} onRetry={retry} />}
      
      <div className="mt-4 text-right">
        <button 
          onClick={() => setShowPrivacySettings(!showPrivacySettings)}
          className="text-sm text-gray-600 underline focus:ring-2 focus:ring-primary focus:outline-none"
          aria-label="Toggle privacy settings"
        >
          Privacy Settings
        </button>
      </div>
      
      {showPrivacySettings && (
        <PrivacyControls onSave={handlePrivacySettingsSave} />
      )}
      
      {/* Main authentication flow would go here */}
      
      {isAuthenticated && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mx-auto mb-4 text-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Authentication Successful</h3>
            <p className="mb-6">Your identity has been verified successfully.</p>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:outline-none"
              aria-label="Continue to dashboard"
              tabIndex="0"
              onKeyDown={(e) => e.key === 'Enter' && setIsAuthenticated(false)}
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
      
      <button 
        onClick={handleContinue}
        disabled={isLoading}
        className={`bg-primary text-white px-6 py-2 rounded-lg transition focus:ring-2 focus:ring-primary focus:outline-none
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'}`}
        aria-label="Continue to next step"
      >
        {isLoading ? 'Processing...' : 'Continue'}
        <span className="sr-only">to the next authentication step</span>
      </button>
    </div>
  );
};

export default BioMetrAfriCaRevolutionaryDemo;

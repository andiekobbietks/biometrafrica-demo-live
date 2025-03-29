import React, { useState } from 'react';

const PrivacyControls = ({ onSave }) => {
  const [settings, setSettings] = useState({
    storeData: true,
    anonymizeData: false,
    dataRetentionPeriod: 30
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <h3 className="font-medium text-lg mb-3">Privacy Settings</h3>
      
      <div className="mb-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="storeData"
            checked={settings.storeData}
            onChange={handleChange}
            className="mr-2"
            aria-label="Allow data storage"
          />
          <span>Allow data storage for improved service</span>
        </label>
      </div>
      
      <div className="mb-3">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="anonymizeData"
            checked={settings.anonymizeData}
            onChange={handleChange}
            className="mr-2"
            aria-label="Anonymize stored data"
          />
          <span>Anonymize stored data</span>
        </label>
      </div>
      
      <div className="mb-3">
        <label className="block mb-1" htmlFor="dataRetentionPeriod">Data retention period (days):</label>
        <select
          id="dataRetentionPeriod"
          name="dataRetentionPeriod"
          value={settings.dataRetentionPeriod}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-primary focus:outline-none"
        >
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="90">90 days</option>
          <option value="365">1 year</option>
        </select>
      </div>
      
      <button 
        onClick={() => onSave(settings)}
        className="bg-primary text-white px-4 py-1 rounded hover:bg-primary-dark transition focus:ring-2 focus:ring-primary focus:outline-none"
        aria-label="Save privacy preferences"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default PrivacyControls;

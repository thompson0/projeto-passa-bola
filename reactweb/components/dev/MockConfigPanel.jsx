'use client';

import React, { useState, useEffect } from 'react';
import { mockConfig } from '@/services/mockConfig';

const MockConfigPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMockEnabled, setIsMockEnabled] = useState(false);
  const [apiConfigs, setApiConfigs] = useState({
    community: true,
    shop: true,
    voting: true,
    matches: true,
    news: true,
    profile: true
  });
  
  useEffect(() => {
    setIsMockEnabled(mockConfig.isMockEnabled());
    
    // Carregar configurações específicas de API
    const configs = {};
    Object.keys(apiConfigs).forEach(apiName => {
      configs[apiName] = mockConfig.isApiMocked(apiName);
    });
    setApiConfigs(configs);
  }, []);
  
  const handleToggleMock = () => {
    const newValue = !isMockEnabled;
    mockConfig.setMockEnabled(newValue);
    setIsMockEnabled(newValue);
  };
  
  const handleToggleApiMock = (apiName) => {
    const newValue = !apiConfigs[apiName];
    mockConfig.setApiMocked(apiName, newValue);
    setApiConfigs(prev => ({
      ...prev,
      [apiName]: newValue
    }));
  };
  
  if (!process.env.NODE_ENV === 'development') {
    return null;
  }
  
  return (
    <>
      <button
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Fechar Config' : 'Config Mocks'}
      </button>
      
      {isOpen && (
        <div className="fixed bottom-16 left-4 z-50 bg-gray-800 text-white p-4 rounded-md shadow-lg w-64">
          <h3 className="text-sm font-bold mb-2">Configuração de Mocks</h3>
          
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isMockEnabled}
                onChange={handleToggleMock}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Habilitar Mocks</span>
            </label>
          </div>
          
          {isMockEnabled && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold">APIs Específicas:</h4>
              
              {Object.keys(apiConfigs).map(apiName => (
                <label key={apiName} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={apiConfigs[apiName]}
                    onChange={() => handleToggleApiMock(apiName)}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs">{apiName}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MockConfigPanel;
// app/dev-config/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { mockConfig } from '@/services/mockConfig';
import { Button } from '@/components/ui';

export default function DevConfigPage() {
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
  
  const handleResetConfig = () => {
    mockConfig.setMockEnabled(true);
    
    Object.keys(apiConfigs).forEach(apiName => {
      mockConfig.setApiMocked(apiName, true);
    });
    
    setIsMockEnabled(true);
    setApiConfigs(prev => {
      const newConfigs = {};
      Object.keys(prev).forEach(key => {
        newConfigs[key] = true;
      });
      return newConfigs;
    });
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Configuração de Mocks</h1>
      
      <div className="bg-background-light rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">Configuração Global</h2>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-300">Habilitar Mocks</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={isMockEnabled}
              onChange={handleToggleMock}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleResetConfig}
        >
          Resetar Configurações
        </Button>
      </div>
      
      {isMockEnabled && (
        <div className="bg-background-light rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">APIs Específicas</h2>
          
          <div className="space-y-4">
            {Object.keys(apiConfigs).map(apiName => (
              <div key={apiName} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{apiName}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={apiConfigs[apiName]}
                    onChange={() => handleToggleApiMock(apiName)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
const MOCK_CONFIG_KEY = 'use_mock_data';

export const mockConfig = {
  // Verifica se os mocks estão habilitados
  isMockEnabled: () => {
    // Em ambiente de desenvolvimento, sempre usar mocks por padrão
    if (process.env.NODE_ENV === 'development') {
      // Verificar se há uma configuração explícita no localStorage
      const storedConfig = typeof window !== 'undefined' ? localStorage.getItem(MOCK_CONFIG_KEY) : null;
      return storedConfig === null ? true : storedConfig === 'true';
    }
    
    // Em produção, não usar mocks por padrão
    return false;
  },
  
  // Habilita ou desabilita os mocks
  setMockEnabled: (enabled) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(MOCK_CONFIG_KEY, enabled ? 'true' : 'false');
    }
  },
  
  // Retorna o ambiente atual (mock ou api)
  getEnvironment: () => {
    return mockConfig.isMockEnabled() ? 'mock' : 'api';
  },
  
  // Verifica se uma API específica está usando mocks
  isApiMocked: (apiName) => {
    if (!mockConfig.isMockEnabled()) {
      return false;
    }
    
    // Verificar se há uma configuração específica para esta API
    const apiConfigKey = `use_mock_${apiName}`;
    const apiConfig = typeof window !== 'undefined' ? localStorage.getItem(apiConfigKey) : null;
    
    // Se não houver configuração específica, usar a configuração global
    return apiConfig === null ? true : apiConfig === 'true';
  },
  
  // Habilita ou desabilita os mocks para uma API específica
  setApiMocked: (apiName, enabled) => {
    if (typeof window !== 'undefined') {
      const apiConfigKey = `use_mock_${apiName}`;
      localStorage.setItem(apiConfigKey, enabled ? 'true' : 'false');
    }
  }
};

export default mockConfig;
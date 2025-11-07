import { mockConfig } from './mockConfig';

// Importar serviços mock
import { communityService as communityMockService } from './mocks/communityData';
import { shopService as shopMockService } from './mocks/shopData';
import { votingService as votingMockService } from './mocks/votingData';
import { matchesService as matchesMockService } from './mocks/matchesData';
import { newsService as newsMockService } from './mocks/newsData';
import { playerService as playerMockService } from './mocks/playerData';

// Serviços reais (a serem implementados quando houver uma API real)
const realServices = {
  community: {
    // Implementar quando houver uma API real
    getPosts: async () => {
      throw new Error('API real não implementada');
    }
    // ... outros métodos
  },
  shop: {
    // Implementar quando houver uma API real
    getProducts: async () => {
      throw new Error('API real não implementada');
    }
    // ... outros métodos
  },
  // ... outros serviços
};

// Serviços mock
const mockServices = {
  community: communityMockService,
  shop: shopMockService,
  voting: votingMockService,
  matches: matchesMockService,
  news: newsMockService,
  player: playerMockService
};

// Função para obter o serviço apropriado (mock ou real)
export const getService = (serviceName) => {
  const useMock = mockConfig.isApiMocked(serviceName);
  
  if (useMock) {
    return mockServices[serviceName] || null;
  } else {
    return realServices[serviceName] || null;
  }
};

// Exportar serviços específicos
export const communityService = {
  ...getService('community'),
  _isMocked: () => mockConfig.isApiMocked('community')
};

export const shopService = {
  ...getService('shop'),
  _isMocked: () => mockConfig.isApiMocked('shop')
};

export const votingService = {
  ...getService('voting'),
  _isMocked: () => mockConfig.isApiMocked('voting')
};

export const matchesService = {
  ...getService('matches'),
  _isMocked: () => mockConfig.isApiMocked('matches')
};

export const newsService = {
  ...getService('news'),
  _isMocked: () => mockConfig.isApiMocked('news')
};

export const playerService = {
  ...getService('player'),
  _isMocked: () => mockConfig.isApiMocked('player')
};
// Mock data para o feed da jogadora

export const heroData = {
  image: '/assets/images/hero-jogadora.jpg',
  title: 'Bem-vinda, Ana Santos',
  subtitle: 'Confira suas próximas partidas e atualizações da comunidade',
  team: 'Corinthians',
  position: 'Atacante'
};

export const playerMatchesData = [
  {
    id: 1,
    type: 'Campeonato',
    competition: 'Brasileiro Feminino A1',
    home: 'Corinthians',
    away: 'Ferroviária',
    homeImage: '/assets/images/teams/corinthians.png',
    awayImage: '/assets/images/teams/ferroviaria.png',
    date: '2023-11-07T19:00:00',
    stadium: 'Neo Química Arena',
    status: 'Hoje',
    confirmed: false,
    link: '/partidas/6'
  },
  {
    id: 2,
    type: 'Treino',
    competition: 'Treino Tático',
    home: 'Corinthians',
    away: 'Time B',
    homeImage: '/assets/images/teams/corinthians.png',
    awayImage: '/assets/images/teams/corinthians.png',
    date: '2023-11-08T09:00:00',
    stadium: 'CT Joaquim Grava',
    status: 'Amanhã',
    confirmed: true,
    link: '/treinos/1'
  },
  {
    id: 3,
    type: 'Campeonato',
    competition: 'Brasileiro Feminino A1',
    home: 'Palmeiras',
    away: 'Corinthians',
    homeImage: '/assets/images/teams/palmeiras.png',
    awayImage: '/assets/images/teams/corinthians.png',
    date: '2023-11-12T16:00:00',
    stadium: 'Allianz Parque',
    status: 'Em breve',
    confirmed: false,
    link: '/partidas/8'
  },
  {
    id: 4,
    type: 'Amistoso',
    competition: 'Amistoso Internacional',
    home: 'Corinthians',
    away: 'Barcelona',
    homeImage: '/assets/images/teams/corinthians.png',
    awayImage: '/assets/images/teams/barcelona.png',
    date: '2023-11-18T20:00:00',
    stadium: 'Neo Química Arena',
    status: 'Em breve',
    confirmed: false,
    link: '/partidas/9'
  }
];

export const communityHighlightsData = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Marta Silva',
      avatar: '/assets/images/avatars/marta.jpg',
      team: 'Orlando Pride'
    },
    content: 'Muito feliz em anunciar que estarei de volta aos gramados na próxima semana! Obrigada pelo apoio de todos durante minha recuperação.',
    likes: 1245,
    comments: 89,
    date: '2023-11-05T14:30:00',
    link: '/comunidade/posts/1'
  },
  {
    id: 2,
    type: 'media',
    author: {
      name: 'Debinha',
      avatar: '/assets/images/avatars/debinha.jpg',
      team: 'Kansas City Current'
    },
    title: 'Treino de finalização com a seleção brasileira',
    thumbnail: '/assets/images/media-7.jpg',
    duration: '3:45',
    likes: 876,
    comments: 42,
    date: '2023-11-04T10:15:00',
    link: '/comunidade/media/2'
  },
  {
    id: 3,
    type: 'post',
    author: {
      name: 'Formiga',
      avatar: '/assets/images/avatars/formiga.jpg',
      team: 'São Paulo'
    },
    content: 'Hoje é dia de celebrar mais um ano de carreira! Gratidão por todos que fizeram parte dessa jornada incrível no futebol feminino.',
    likes: 2134,
    comments: 156,
    date: '2023-11-03T09:45:00',
    link: '/comunidade/posts/3'
  },
  {
    id: 4,
    type: 'media',
    author: {
      name: 'Cristiane',
      avatar: '/assets/images/avatars/cristiane.jpg',
      team: 'Santos'
    },
    title: 'Melhores momentos da minha carreira',
    thumbnail: '/assets/images/media-8.jpg',
    duration: '8:20',
    likes: 1567,
    comments: 98,
    date: '2023-11-02T16:20:00',
    link: '/comunidade/media/4'
  }
];

export const shopItemsData = [
  {
    id: 1,
    name: 'Camisa Oficial Feminina 2023',
    price: 249.90,
    discount: 199.90,
    image: '/assets/images/shop/camisa.jpg',
    link: '/loja/produtos/1'
  },
  {
    id: 2,
    name: 'Chuteira Profissional Nike',
    price: 599.90,
    discount: null,
    image: '/assets/images/shop/chuteira.jpg',
    link: '/loja/produtos/2'
  },
  {
    id: 3,
    name: 'Kit Treino Feminino',
    price: 349.90,
    discount: 299.90,
    image: '/assets/images/shop/kit-treino.jpg',
    link: '/loja/produtos/3'
  },
  {
    id: 4,
    name: 'Bola Oficial Campeonato',
    price: 179.90,
    discount: 149.90,
    image: '/assets/images/shop/bola.jpg',
    link: '/loja/produtos/4'
  }
];

export const playerFeedService = {
  getFeed: () => {
    return {
      hero: heroData,
      matches: playerMatchesData.slice(0, 3), // Apenas as 3 primeiras partidas
      communityHighlights: communityHighlightsData.slice(0, 3), // Apenas os 3 primeiros destaques
      shopItems: shopItemsData.slice(0, 3) // Apenas os 3 primeiros produtos
    };
  },
  
  getAllMatches: () => {
    return playerMatchesData;
  },
  
  getAllCommunityHighlights: () => {
    return communityHighlightsData;
  },
  
  getAllShopItems: () => {
    return shopItemsData;
  },
  
  confirmMatch: (matchId) => {
    // Simulação de confirmação de presença
    const match = playerMatchesData.find(m => m.id === matchId);
    if (match) {
      match.confirmed = true;
      return { success: true, message: 'Presença confirmada com sucesso!' };
    }
    return { success: false, message: 'Não foi possível confirmar presença.' };
  }
};
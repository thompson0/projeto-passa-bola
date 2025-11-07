// Mock data para o feed da torcedora

export const heroData = {
  image: '/assets/images/hero-torcedora.jpg',
  title: 'Campeonato Brasileiro Feminino 2023',
  subtitle: 'Acompanhe os jogos, notícias e destaques do maior campeonato de futebol feminino do Brasil',
  cta: 'Ver tabela',
  ctaLink: '/competicoes/brasileiro-feminino'
};

export const tickerData = [
  { id: 1, home: 'Corinthians', away: 'Palmeiras', homeScore: 3, awayScore: 1, status: 'Finalizado', link: '/partidas/1' },
  { id: 2, home: 'São Paulo', away: 'Santos', homeScore: 2, awayScore: 2, status: 'Finalizado', link: '/partidas/2' },
  { id: 3, home: 'Flamengo', away: 'Fluminense', homeScore: 1, awayScore: 0, status: 'Finalizado', link: '/partidas/3' },
  { id: 4, home: 'Internacional', away: 'Grêmio', homeScore: 2, awayScore: 1, status: 'Finalizado', link: '/partidas/4' },
  { id: 5, home: 'Cruzeiro', away: 'Atlético-MG', homeScore: 0, awayScore: 0, status: 'Finalizado', link: '/partidas/5' }
];

export const newsData = [
  {
    id: 1,
    title: 'Marta é eleita melhor jogadora do mundo pela 7ª vez',
    excerpt: 'A brasileira Marta foi eleita pela FIFA como a melhor jogadora do mundo pela sétima vez em sua carreira, estabelecendo um novo recorde.',
    image: '/assets/images/news-1.jpg',
    category: 'Premiações',
    date: '2023-11-05',
    link: '/noticias/1'
  },
  {
    id: 2,
    title: 'Corinthians conquista o tetracampeonato brasileiro feminino',
    excerpt: 'O Corinthians venceu o Palmeiras na final e conquistou o tetracampeonato brasileiro feminino, consolidando sua hegemonia no futebol nacional.',
    image: '/assets/images/news-2.jpg',
    category: 'Campeonatos',
    date: '2023-10-28',
    link: '/noticias/2'
  },
  {
    id: 3,
    title: 'Seleção brasileira anuncia amistosos para preparação para Copa',
    excerpt: 'A seleção brasileira feminina anunciou uma série de amistosos contra equipes de alto nível para se preparar para a próxima Copa do Mundo.',
    image: '/assets/images/news-3.jpg',
    category: 'Seleção',
    date: '2023-10-20',
    link: '/noticias/3'
  },
  {
    id: 4,
    title: 'Novo recorde de público em jogo de futebol feminino no Brasil',
    excerpt: 'A final do Campeonato Brasileiro Feminino bateu recorde de público, com mais de 40 mil torcedores presentes no estádio.',
    image: '/assets/images/news-4.jpg',
    category: 'Recordes',
    date: '2023-10-15',
    link: '/noticias/4'
  },
  {
    id: 5,
    title: 'Jogadora revelação do ano assina com clube europeu',
    excerpt: 'A jovem atacante brasileira, considerada a revelação do ano, assinou contrato com um dos principais clubes da Europa.',
    image: '/assets/images/news-5.jpg',
    category: 'Transferências',
    date: '2023-10-10',
    link: '/noticias/5'
  },
  {
    id: 6,
    title: 'CBF anuncia aumento de investimento no futebol feminino',
    excerpt: 'A Confederação Brasileira de Futebol anunciou um aumento significativo no investimento para o desenvolvimento do futebol feminino no país.',
    image: '/assets/images/news-6.jpg',
    category: 'Desenvolvimento',
    date: '2023-10-05',
    link: '/noticias/6'
  }
];

export const upcomingMatchesData = [
  {
    id: 1,
    home: 'Corinthians',
    away: 'Ferroviária',
    homeImage: '/assets/images/teams/corinthians.png',
    awayImage: '/assets/images/teams/ferroviaria.png',
    date: '2023-11-07T19:00:00',
    stadium: 'Neo Química Arena',
    competition: 'Brasileiro Feminino A1',
    status: 'Hoje',
    link: '/partidas/6'
  },
  {
    id: 2,
    home: 'Palmeiras',
    away: 'São Paulo',
    homeImage: '/assets/images/teams/palmeiras.png',
    awayImage: '/assets/images/teams/sao-paulo.png',
    date: '2023-11-07T21:30:00',
    stadium: 'Allianz Parque',
    competition: 'Brasileiro Feminino A1',
    status: 'Hoje',
    link: '/partidas/7'
  },
  {
    id: 3,
    home: 'Santos',
    away: 'Flamengo',
    homeImage: '/assets/images/teams/santos.png',
    awayImage: '/assets/images/teams/flamengo.png',
    date: '2023-11-08T16:00:00',
    stadium: 'Vila Belmiro',
    competition: 'Brasileiro Feminino A1',
    status: 'Amanhã',
    link: '/partidas/8'
  },
  {
    id: 4,
    home: 'Internacional',
    away: 'Grêmio',
    homeImage: '/assets/images/teams/internacional.png',
    awayImage: '/assets/images/teams/gremio.png',
    date: '2023-11-09T19:00:00',
    stadium: 'Beira-Rio',
    competition: 'Brasileiro Feminino A1',
    status: 'Em breve',
    link: '/partidas/9'
  },
  {
    id: 5,
    home: 'Cruzeiro',
    away: 'Atlético-MG',
    homeImage: '/assets/images/teams/cruzeiro.png',
    awayImage: '/assets/images/teams/atletico-mg.png',
    date: '2023-11-10T20:00:00',
    stadium: 'Mineirão',
    competition: 'Brasileiro Feminino A1',
    status: 'Em breve',
    link: '/partidas/10'
  }
];

export const mediaHighlightsData = [
  {
    id: 1,
    title: 'Melhores momentos: Corinthians 3 x 1 Palmeiras',
    thumbnail: '/assets/images/media-1.jpg',
    type: 'video',
    duration: '5:32',
    link: '/videos/1'
  },
  {
    id: 2,
    title: 'Gol de placa da atacante do São Paulo',
    thumbnail: '/assets/images/media-2.jpg',
    type: 'video',
    duration: '1:15',
    link: '/videos/2'
  },
  {
    id: 3,
    title: 'Entrevista exclusiva com Marta',
    thumbnail: '/assets/images/media-3.jpg',
    type: 'video',
    duration: '8:45',
    link: '/videos/3'
  },
  {
    id: 4,
    title: 'Defesa incrível da goleira do Flamengo',
    thumbnail: '/assets/images/media-4.jpg',
    type: 'video',
    duration: '0:48',
    link: '/videos/4'
  },
  {
    id: 5,
    title: 'Bastidores da final do Brasileiro Feminino',
    thumbnail: '/assets/images/media-5.jpg',
    type: 'video',
    duration: '12:20',
    link: '/videos/5'
  },
  {
    id: 6,
    title: 'Treino da Seleção Brasileira Feminina',
    thumbnail: '/assets/images/media-6.jpg',
    type: 'video',
    duration: '3:55',
    link: '/videos/6'
  }
];

export const fanFeedService = {
  getFeed: () => {
    return {
      hero: heroData,
      ticker: tickerData,
      news: newsData.slice(0, 3), // Apenas as 3 primeiras notícias
      upcomingMatches: upcomingMatchesData.slice(0, 3), // Apenas as 3 primeiras partidas
      mediaHighlights: mediaHighlightsData.slice(0, 4) // Apenas os 4 primeiros destaques
    };
  },
  
  getAllNews: () => {
    return newsData;
  },
  
  getAllUpcomingMatches: () => {
    return upcomingMatchesData;
  },
  
  getAllMediaHighlights: () => {
    return mediaHighlightsData;
  }
};
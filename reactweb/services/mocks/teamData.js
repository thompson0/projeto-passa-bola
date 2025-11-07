// Mock data para dashboard da equipe

export const teamData = {
  id: 1,
  name: 'Corinthians',
  logo: '/assets/images/teams/corinthians.png',
  coverImage: '/assets/images/teams/corinthians-cover.jpg',
  founded: '1910',
  stadium: 'Neo Química Arena',
  city: 'São Paulo',
  country: 'Brasil',
  website: 'https://www.corinthians.com.br',
  colors: ['Preto', 'Branco'],
  coach: 'Arthur Elias',
  captain: 'Tamires',
  stats: {
    wins: 24,
    draws: 5,
    losses: 3,
    goalsScored: 78,
    goalsConceded: 22,
    cleanSheets: 15
  },
  roster: [
    { id: 1, name: 'Lelê', number: 1, position: 'Goleira', avatar: '/assets/images/players/lele.jpg' },
    { id: 2, name: 'Katiuscia', number: 2, position: 'Lateral Direita', avatar: '/assets/images/players/katiuscia.jpg' },
    { id: 3, name: 'Erika', number: 3, position: 'Zagueira', avatar: '/assets/images/players/erika.jpg' },
    { id: 4, name: 'Tarciane', number: 4, position: 'Zagueira', avatar: '/assets/images/players/tarciane.jpg' },
    { id: 5, name: 'Tamires', number: 6, position: 'Lateral Esquerda', avatar: '/assets/images/players/tamires.jpg' },
    { id: 6, name: 'Duda Sampaio', number: 5, position: 'Volante', avatar: '/assets/images/players/duda.jpg' },
    { id: 7, name: 'Victória Albuquerque', number: 8, position: 'Meio-campista', avatar: '/assets/images/players/victoria.jpg' },
    { id: 8, name: 'Gabi Zanotti', number: 10, position: 'Meio-campista', avatar: '/assets/images/players/zanotti.jpg' },
    { id: 9, name: 'Gabi Portilho', number: 7, position: 'Atacante', avatar: '/assets/images/players/portilho.jpg' },
    { id: 10, name: 'Jheniffer', number: 9, position: 'Atacante', avatar: '/assets/images/players/jheniffer.jpg' },
    { id: 11, name: 'Millene', number: 11, position: 'Atacante', avatar: '/assets/images/players/millene.jpg' }
  ],
  upcomingMatches: [
    {
      id: 1,
      date: '2023-11-10T19:00:00',
      opponent: 'Palmeiras',
      opponentLogo: '/assets/images/teams/palmeiras.png',
      competition: 'Brasileiro Feminino A1',
      location: 'Neo Química Arena, São Paulo, SP',
      isHome: true
    },
    {
      id: 2,
      date: '2023-11-15T16:00:00',
      opponent: 'Santos',
      opponentLogo: '/assets/images/teams/santos.png',
      competition: 'Brasileiro Feminino A1',
      location: 'Vila Belmiro, Santos, SP',
      isHome: false
    },
    {
      id: 3,
      date: '2023-11-20T20:00:00',
      opponent: 'São Paulo',
      opponentLogo: '/assets/images/teams/sao-paulo.png',
      competition: 'Brasileiro Feminino A1',
      location: 'Neo Química Arena, São Paulo, SP',
      isHome: true
    }
  ],
  registrations: [
    {
      id: 1,
      competition: 'Copa do Brasil Feminina 2024',
      deadline: '2023-12-15',
      status: 'Aberta',
      requiredDocuments: ['Ficha de inscrição', 'Atestado médico', 'Documento de identidade'],
      registeredPlayers: 15,
      totalPlayers: 25
    },
    {
      id: 2,
      competition: 'Campeonato Paulista Feminino 2024',
      deadline: '2024-01-20',
      status: 'Em breve',
      requiredDocuments: ['Ficha de inscrição', 'Atestado médico', 'Documento de identidade'],
      registeredPlayers: 0,
      totalPlayers: 25
    },
    {
      id: 3,
      competition: 'Supercopa do Brasil Feminina 2024',
      deadline: '2023-11-30',
      status: 'Aberta',
      requiredDocuments: ['Ficha de inscrição', 'Atestado médico', 'Documento de identidade'],
      registeredPlayers: 22,
      totalPlayers: 25
    }
  ]
};

export const teamService = {
  getTeamData: () => {
    return teamData;
  },
  
  getRoster: () => {
    return teamData.roster;
  },
  
  getUpcomingMatches: () => {
    return teamData.upcomingMatches;
  },
  
  getRegistrations: () => {
    return teamData.registrations;
  }
};
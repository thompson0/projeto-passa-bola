// Mock data para perfil da jogadora

export const playerProfileData = {
  id: 1,
  name: 'Ana Santos',
  nickname: 'Ana',
  avatar: '/assets/images/players/ana-santos.jpg',
  coverImage: '/assets/images/players/cover-ana.jpg',
  team: 'Corinthians',
  teamLogo: '/assets/images/teams/corinthians.png',
  position: 'Atacante',
  number: 10,
  birthdate: '1995-05-15',
  height: '1.72m',
  weight: '65kg',
  nationality: 'Brasileira',
  bio: 'Ana Santos é uma atacante brasileira que atua pelo Corinthians. Com uma carreira marcada por gols decisivos e habilidade técnica, ela se tornou uma das principais jogadoras do futebol feminino brasileiro.',
  stats: {
    games: 87,
    goals: 42,
    assists: 23,
    yellowCards: 8,
    redCards: 1,
    minutesPlayed: 7650,
    votes: 1245
  },
  achievements: [
    { id: 1, title: 'Campeã Brasileira', year: '2022', description: 'Campeonato Brasileiro Feminino A1' },
    { id: 2, title: 'Artilheira', year: '2022', description: 'Campeonato Brasileiro Feminino A1 - 15 gols' },
    { id: 3, title: 'Campeã Paulista', year: '2021', description: 'Campeonato Paulista Feminino' },
    { id: 4, title: 'Melhor Jogadora', year: '2021', description: 'Prêmio Craque do Brasileirão Feminino' },
    { id: 5, title: 'Copa Libertadores', year: '2021', description: 'Campeã da Copa Libertadores Feminina' }
  ],
  badges: [
    { id: 1, name: 'Artilheira', icon: '🥇', description: 'Artilheira da temporada 2022' },
    { id: 2, name: 'MVP', icon: '⭐', description: 'Jogadora Mais Valiosa em 3 partidas' },
    { id: 3, name: 'Capitã', icon: '©️', description: 'Capitã do time em 15 jogos' },
    { id: 4, name: 'Hat-trick', icon: '🎩', description: 'Marcou 3 gols em uma partida' },
    { id: 5, name: 'Fã-favorita', icon: '❤️', description: 'Votada como favorita pelos fãs' }
  ],
  ranking: {
    overall: 3,
    position: 1,
    team: 1,
    history: [
      { date: '2023-01', rank: 5 },
      { date: '2023-02', rank: 4 },
      { date: '2023-03', rank: 4 },
      { date: '2023-04', rank: 3 },
      { date: '2023-05', rank: 3 },
      { date: '2023-06', rank: 2 },
      { date: '2023-07', rank: 3 },
      { date: '2023-08', rank: 3 },
      { date: '2023-09', rank: 3 },
      { date: '2023-10', rank: 3 }
    ]
  },
  socialMedia: {
    instagram: 'https://instagram.com/anasantos',
    twitter: 'https://twitter.com/anasantos',
    facebook: 'https://facebook.com/anasantos',
    youtube: 'https://youtube.com/anasantos'
  }
};

export const playerProfileService = {
  getPlayerProfile: (id) => {
    // Em um ambiente real, isso buscaria o perfil do jogador com o ID especificado
    return playerProfileData;
  },
  
  updatePlayerProfile: (id, data) => {
    // Em um ambiente real, isso atualizaria o perfil do jogador no banco de dados
    return {
      success: true,
      message: 'Perfil atualizado com sucesso!',
      data: {
        ...playerProfileData,
        ...data
      }
    };
  },
  
  shareProfile: (id) => {
    // Em um ambiente real, isso geraria um link compartilhável
    return {
      success: true,
      message: 'Link de compartilhamento copiado para a área de transferência!',
      shareLink: `https://passabola.com/perfil/${id}`
    };
  }
};
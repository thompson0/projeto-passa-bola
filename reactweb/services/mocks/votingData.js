export const filterOptions = [
  { id: 'semana-atual', name: 'Semana Atual' },
  { id: 'semana-anterior', name: 'Semana Anterior' },
  { id: 'rodada-1', name: 'Rodada 1' },
  { id: 'rodada-2', name: 'Rodada 2' },
  { id: 'rodada-3', name: 'Rodada 3' },
  { id: 'rodada-4', name: 'Rodada 4' }
];

export const candidatesData = [
  {
    id: 1,
    name: 'Marta Silva',
    photo: '/assets/images/players/marta.jpg',
    team: 'Orlando Pride',
    category: 'Melhor Jogadora',
    position: 'Atacante',
    votes: 1245,
    hasVoted: false
  },
  {
    id: 2,
    name: 'Debinha',
    photo: '/assets/images/players/debinha.jpg',
    team: 'Kansas City Current',
    category: 'Melhor Jogadora',
    position: 'Atacante',
    votes: 1156,
    hasVoted: false
  },
  {
    id: 3,
    name: 'Cristiane',
    photo: '/assets/images/players/cristiane.jpg',
    team: 'Santos',
    category: 'Melhor Gol',
    position: 'Atacante',
    votes: 987,
    hasVoted: false
  },
  {
    id: 4,
    name: 'Tamires',
    photo: '/assets/images/players/tamires.jpg',
    team: 'Corinthians',
    category: 'Melhor Defesa',
    position: 'Lateral Esquerda',
    votes: 876,
    hasVoted: false
  },
  {
    id: 5,
    name: 'Formiga',
    photo: '/assets/images/players/formiga.jpg',
    team: 'São Paulo',
    category: 'Melhor Meio-campista',
    position: 'Volante',
    votes: 765,
    hasVoted: false
  },
  {
    id: 6,
    name: 'Gabi Portilho',
    photo: '/assets/images/players/gabi.jpg',
    team: 'Corinthians',
    category: 'Revelação',
    position: 'Atacante',
    votes: 654,
    hasVoted: false
  },
  {
    id: 7,
    name: 'Lelê',
    photo: '/assets/images/players/lele.jpg',
    team: 'Corinthians',
    category: 'Melhor Goleira',
    position: 'Goleira',
    votes: 543,
    hasVoted: false
  },
  {
    id: 8,
    name: 'Adriana',
    photo: '/assets/images/players/adriana.jpg',
    team: 'Orlando Pride',
    category: 'Melhor Jogadora',
    position: 'Meio-campista',
    votes: 432,
    hasVoted: false
  }
];

export const rankingData = [
  {
    id: 1,
    name: 'Marta Silva',
    team: 'Orlando Pride',
    category: 'Melhor Jogadora',
    position: 'Atacante',
    votes: 1245
  },
  {
    id: 2,
    name: 'Debinha',
    team: 'Kansas City Current',
    category: 'Melhor Jogadora',
    position: 'Atacante',
    votes: 1156
  },
  {
    id: 3,
    name: 'Cristiane',
    team: 'Santos',
    category: 'Melhor Gol',
    position: 'Atacante',
    votes: 987
  },
  {
    id: 4,
    name: 'Tamires',
    team: 'Corinthians',
    category: 'Melhor Defesa',
    position: 'Lateral Esquerda',
    votes: 876
  },
  {
    id: 5,
    name: 'Formiga',
    team: 'São Paulo',
    category: 'Melhor Meio-campista',
    position: 'Volante',
    votes: 765
  },
  {
    id: 6,
    name: 'Gabi Portilho',
    team: 'Corinthians',
    category: 'Revelação',
    position: 'Atacante',
    votes: 654
  },
  {
    id: 7,
    name: 'Lelê',
    team: 'Corinthians',
    category: 'Melhor Goleira',
    position: 'Goleira',
    votes: 543
  },
  {
    id: 8,
    name: 'Adriana',
    team: 'Orlando Pride',
    category: 'Melhor Jogadora',
    position: 'Meio-campista',
    votes: 432
  },
  {
    id: 9,
    name: 'Ludmila',
    team: 'Atlético de Madrid',
    category: 'Melhor Jogadora',
    position: 'Atacante',
    votes: 321
  },
  {
    id: 10,
    name: 'Andressinha',
    team: 'Corinthians',
    category: 'Melhor Meio-campista',
    position: 'Meio-campista',
    votes: 210
  }
];

export const votingService = {
  getFilterOptions: () => {
    return filterOptions;
  },
  
  getCandidates: (filter = 'semana-atual') => {
    return candidatesData;
  },
  
  getRanking: (filter = 'semana-atual') => {
    return rankingData;
  },
  
  vote: (candidateId) => {
    const candidate = candidatesData.find(c => c.id === parseInt(candidateId));
    
    if (!candidate) {
      return { success: false, message: 'Candidata não encontrada.' };
    }
    
    if (candidate.hasVoted) {
      return { success: false, message: 'Você já votou nesta candidata.' };
    }
    
    candidate.votes += 1;
    candidate.hasVoted = true;
    
    const rankingCandidate = rankingData.find(c => c.id === parseInt(candidateId));
    if (rankingCandidate) {
      rankingCandidate.votes += 1;
    }
    
    return { 
      success: true, 
      message: 'Seu voto foi computado!',
      votes: candidate.votes
    };
  },

  getVotedCandidates: () => {
    return candidatesData.filter(candidate => candidate.hasVoted).map(candidate => candidate.id);
  },

  resetVotes: () => {
    candidatesData.forEach(candidate => {
      candidate.hasVoted = false;
    });

    return {
      success: true,
      message: 'Votos resetados com sucesso!'
    };
  }
};

// Mock data para competições globais

export const continents = [
  { id: 'america-sul', name: 'América do Sul', coordinates: { x: 30, y: 65 } },
  { id: 'america-norte', name: 'América do Norte', coordinates: { x: 20, y: 40 } },
  { id: 'europa', name: 'Europa', coordinates: { x: 50, y: 35 } },
  { id: 'africa', name: 'África', coordinates: { x: 50, y: 55 } },
  { id: 'asia', name: 'Ásia', coordinates: { x: 70, y: 45 } },
  { id: 'oceania', name: 'Oceania', coordinates: { x: 85, y: 70 } }
];

export const years = [
  { id: '2023', name: '2023' },
  { id: '2024', name: '2024' },
  { id: '2025', name: '2025' }
];

export const categories = [
  { id: 'copa-mundo', name: 'Copa do Mundo' },
  { id: 'continental', name: 'Continental' },
  { id: 'amistoso', name: 'Amistoso Internacional' },
  { id: 'olimpiadas', name: 'Olimpíadas' },
  { id: 'sub20', name: 'Mundial Sub-20' }
];

export const globalCompetitionsData = [
  {
    id: 1,
    name: 'Copa do Mundo Feminina',
    continent: 'oceania',
    year: '2023',
    category: 'copa-mundo',
    location: 'Austrália e Nova Zelândia',
    startDate: '2023-07-20',
    endDate: '2023-08-20',
    description: 'A Copa do Mundo Feminina da FIFA é a principal competição internacional de futebol feminino. Realizada a cada quatro anos, reúne as melhores seleções do mundo.',
    teams: ['Brasil', 'Estados Unidos', 'Alemanha', 'França', 'Inglaterra', 'Suécia', 'Japão', 'Austrália', 'Canadá', 'Holanda', 'Espanha', 'Noruega', 'Itália', 'China', 'Coreia do Sul', 'Argentina'],
    status: 'Encerrado',
    winner: 'Espanha',
    image: '/assets/images/competitions/world-cup.jpg',
    website: 'https://www.fifa.com/womensworldcup/',
    registrationOpen: false
  },
  {
    id: 2,
    name: 'Copa América Feminina',
    continent: 'america-sul',
    year: '2024',
    category: 'continental',
    location: 'Colômbia',
    startDate: '2024-07-10',
    endDate: '2024-07-28',
    description: 'A Copa América Feminina é o principal torneio de futebol feminino entre seleções nacionais da América do Sul, organizado pela CONMEBOL.',
    teams: ['Brasil', 'Argentina', 'Colômbia', 'Chile', 'Paraguai', 'Uruguai', 'Equador', 'Venezuela', 'Peru', 'Bolívia'],
    status: 'Inscrições abertas',
    image: '/assets/images/competitions/copa-america.jpg',
    website: 'https://www.conmebol.com/',
    registrationOpen: true,
    registrationDeadline: '2024-05-15'
  },
  {
    id: 3,
    name: 'Campeonato Europeu Feminino',
    continent: 'europa',
    year: '2025',
    category: 'continental',
    location: 'Suíça',
    startDate: '2025-07-02',
    endDate: '2025-07-27',
    description: 'O Campeonato Europeu Feminino da UEFA é a principal competição de futebol feminino entre as seleções nacionais da Europa.',
    teams: ['Inglaterra', 'Alemanha', 'França', 'Espanha', 'Suécia', 'Holanda', 'Itália', 'Noruega', 'Dinamarca', 'Bélgica', 'Suíça', 'Áustria', 'Portugal', 'Islândia', 'Finlândia', 'Irlanda do Norte'],
    status: 'Em breve',
    image: '/assets/images/competitions/euro-women.jpg',
    website: 'https://www.uefa.com/womenseuro/',
    registrationOpen: false
  },
  {
    id: 4,
    name: 'Jogos Olímpicos - Futebol Feminino',
    continent: 'europa',
    year: '2024',
    category: 'olimpiadas',
    location: 'França',
    startDate: '2024-07-24',
    endDate: '2024-08-10',
    description: 'O torneio de futebol feminino dos Jogos Olímpicos é uma das principais competições internacionais, realizada a cada quatro anos como parte dos Jogos Olímpicos de Verão.',
    teams: ['Brasil', 'Estados Unidos', 'Japão', 'Canadá', 'Grã-Bretanha', 'Suécia', 'Holanda', 'Austrália', 'Nova Zelândia', 'China', 'França', 'Alemanha'],
    status: 'Inscrições abertas',
    image: '/assets/images/competitions/olympics.jpg',
    website: 'https://olympics.com/',
    registrationOpen: true,
    registrationDeadline: '2024-03-30'
  },
  {
    id: 5,
    name: 'Copa do Mundo Feminina Sub-20',
    continent: 'america-norte',
    year: '2024',
    category: 'sub20',
    location: 'México',
    startDate: '2024-08-15',
    endDate: '2024-09-05',
    description: 'A Copa do Mundo Feminina Sub-20 da FIFA é uma competição internacional de futebol feminino para jogadoras com até 20 anos de idade.',
    teams: ['Brasil', 'Estados Unidos', 'Alemanha', 'França', 'Japão', 'Coreia do Norte', 'México', 'Nigéria', 'Gana', 'Canadá', 'Espanha', 'Holanda'],
    status: 'Inscrições abertas',
    image: '/assets/images/competitions/u20-world-cup.jpg',
    website: 'https://www.fifa.com/u20womensworldcup/',
    registrationOpen: true,
    registrationDeadline: '2024-06-30'
  },
  {
    id: 6,
    name: 'Amistoso Internacional - SheBelieves Cup',
    continent: 'america-norte',
    year: '2024',
    category: 'amistoso',
    location: 'Estados Unidos',
    startDate: '2024-02-15',
    endDate: '2024-02-25',
    description: 'A SheBelieves Cup é um torneio amistoso internacional de futebol feminino realizado anualmente nos Estados Unidos.',
    teams: ['Estados Unidos', 'Brasil', 'Japão', 'Canadá'],
    status: 'Inscrições abertas',
    image: '/assets/images/competitions/shebelieves-cup.jpg',
    website: 'https://www.ussoccer.com/shebelieves',
    registrationOpen: true,
    registrationDeadline: '2023-12-31'
  },
  {
    id: 7,
    name: 'Copa Asiática Feminina',
    continent: 'asia',
    year: '2025',
    category: 'continental',
    location: 'Japão',
    startDate: '2025-01-15',
    endDate: '2025-02-05',
    description: 'A Copa Asiática Feminina da AFC é a principal competição de futebol feminino entre as seleções nacionais da Ásia.',
    teams: ['Japão', 'Austrália', 'China', 'Coreia do Sul', 'Vietnã', 'Tailândia', 'Filipinas', 'Taiwan', 'Índia', 'Uzbequistão', 'Jordânia', 'Indonésia'],
    status: 'Em breve',
    image: '/assets/images/competitions/afc-women.jpg',
    website: 'https://www.the-afc.com/',
    registrationOpen: false
  },
  {
    id: 8,
    name: 'Copa Africana de Nações Feminina',
    continent: 'africa',
    year: '2024',
    category: 'continental',
    location: 'Marrocos',
    startDate: '2024-07-05',
    endDate: '2024-07-25',
    description: 'A Copa Africana de Nações Feminina é a principal competição de futebol feminino entre as seleções nacionais da África.',
    teams: ['Nigéria', 'África do Sul', 'Camarões', 'Gana', 'Costa do Marfim', 'Marrocos', 'Zâmbia', 'Senegal', 'Tunísia', 'Argélia', 'Egito', 'Quênia'],
    status: 'Inscrições abertas',
    image: '/assets/images/competitions/africa-cup.jpg',
    website: 'https://www.cafonline.com/',
    registrationOpen: true,
    registrationDeadline: '2024-04-30'
  }
];

export const globalCompetitionsService = {
  getCompetitions: (filters = {}) => {
    let filteredCompetitions = [...globalCompetitionsData];
    
    // Aplicar filtros
    if (filters.continent && filters.continent !== 'todos') {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.continent === filters.continent);
    }
    
    if (filters.year && filters.year !== 'todos') {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.year === filters.year);
    }
    
    if (filters.category && filters.category !== 'todos') {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.category === filters.category);
    }
    
    return filteredCompetitions;
  },
  
  getCompetitionById: (id) => {
    return globalCompetitionsData.find(comp => comp.id === parseInt(id)) || null;
  },
  
  getContinents: () => {
    return continents;
  },
  
  getYears: () => {
    return years;
  },
  
  getCategories: () => {
    return categories;
  },
  
  applyForCompetition: (competitionId, teamData) => {
    // Simulação de inscrição em uma competição
    const competition = globalCompetitionsData.find(comp => comp.id === parseInt(competitionId));
    
    if (!competition) {
      return { success: false, message: 'Competição não encontrada.' };
    }
    
    if (!competition.registrationOpen) {
      return { success: false, message: 'As inscrições para esta competição não estão abertas.' };
    }
    
    // Em um ambiente real, aqui seria feito o processamento da inscrição
    
    return { 
      success: true, 
      message: 'Inscrição realizada com sucesso! Em breve entraremos em contato para os próximos passos.',
      data: {
        competitionId,
        competitionName: competition.name,
        teamName: teamData.name,
        registrationDate: new Date().toISOString()
      }
    };
  }
};
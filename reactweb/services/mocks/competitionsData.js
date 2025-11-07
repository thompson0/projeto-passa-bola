// Mock data para competições

export const brazilStates = [
  { id: 'SP', name: 'São Paulo', coordinates: { x: 65, y: 55 } },
  { id: 'RJ', name: 'Rio de Janeiro', coordinates: { x: 72, y: 52 } },
  { id: 'MG', name: 'Minas Gerais', coordinates: { x: 70, y: 45 } },
  { id: 'RS', name: 'Rio Grande do Sul', coordinates: { x: 55, y: 75 } },
  { id: 'PR', name: 'Paraná', coordinates: { x: 58, y: 65 } },
  { id: 'SC', name: 'Santa Catarina', coordinates: { x: 60, y: 70 } },
  { id: 'BA', name: 'Bahia', coordinates: { x: 80, y: 35 } },
  { id: 'PE', name: 'Pernambuco', coordinates: { x: 90, y: 30 } },
  { id: 'CE', name: 'Ceará', coordinates: { x: 85, y: 25 } },
  { id: 'GO', name: 'Goiás', coordinates: { x: 60, y: 40 } },
  { id: 'DF', name: 'Distrito Federal', coordinates: { x: 65, y: 38 } },
  { id: 'AM', name: 'Amazonas', coordinates: { x: 40, y: 25 } },
  { id: 'PA', name: 'Pará', coordinates: { x: 55, y: 25 } }
];

export const competitionCategories = [
  { id: 'adulto', name: 'Adulto' },
  { id: 'sub20', name: 'Sub-20' },
  { id: 'sub17', name: 'Sub-17' },
  { id: 'sub15', name: 'Sub-15' }
];

export const competitionTypes = [
  { id: 'campeonato', name: 'Campeonato' },
  { id: 'copa', name: 'Copa' },
  { id: 'torneio', name: 'Torneio' },
  { id: 'amistoso', name: 'Amistoso' }
];

export const competitionsData = [
  {
    id: 1,
    name: 'Campeonato Paulista Feminino',
    state: 'SP',
    category: 'adulto',
    type: 'campeonato',
    startDate: '2023-08-15',
    endDate: '2023-12-10',
    registrationDeadline: '2023-07-30',
    location: 'São Paulo, SP',
    description: 'O Campeonato Paulista de Futebol Feminino é a principal competição de futebol feminino do estado de São Paulo, organizada pela Federação Paulista de Futebol.',
    teams: ['Corinthians', 'Palmeiras', 'São Paulo', 'Santos', 'Ferroviária', 'Red Bull Bragantino', 'Taubaté', 'Realidade Jovem'],
    format: 'Fase de grupos seguida de mata-mata',
    prize: 'R$ 150.000,00 para o campeão',
    contact: 'competicoes@fpf.org.br',
    website: 'https://www.fpf.org.br',
    registrationFee: 'R$ 5.000,00',
    status: 'Em andamento'
  },
  {
    id: 2,
    name: 'Campeonato Carioca Feminino',
    state: 'RJ',
    category: 'adulto',
    type: 'campeonato',
    startDate: '2023-09-05',
    endDate: '2023-12-15',
    registrationDeadline: '2023-08-20',
    location: 'Rio de Janeiro, RJ',
    description: 'O Campeonato Carioca de Futebol Feminino é a principal competição de futebol feminino do estado do Rio de Janeiro, organizada pela Federação de Futebol do Estado do Rio de Janeiro.',
    teams: ['Flamengo', 'Fluminense', 'Vasco', 'Botafogo', 'Portuguesa-RJ', 'Boavista', 'Duque de Caxias', 'Madureira'],
    format: 'Fase de grupos seguida de mata-mata',
    prize: 'R$ 120.000,00 para o campeão',
    contact: 'competicoes@ferj.org.br',
    website: 'https://www.ferj.org.br',
    registrationFee: 'R$ 4.500,00',
    status: 'Em andamento'
  },
  {
    id: 3,
    name: 'Copa Gaúcha Feminina',
    state: 'RS',
    category: 'adulto',
    type: 'copa',
    startDate: '2023-10-10',
    endDate: '2023-12-20',
    registrationDeadline: '2023-09-25',
    location: 'Porto Alegre, RS',
    description: 'A Copa Gaúcha de Futebol Feminino é uma competição organizada pela Federação Gaúcha de Futebol para equipes femininas do Rio Grande do Sul.',
    teams: ['Internacional', 'Grêmio', 'Juventude', 'Brasil de Pelotas', 'Pelotas', 'São José-RS', 'Novo Hamburgo', 'Avenida'],
    format: 'Fase de grupos seguida de mata-mata',
    prize: 'R$ 100.000,00 para o campeão',
    contact: 'competicoes@fgf.org.br',
    website: 'https://www.fgf.org.br',
    registrationFee: 'R$ 4.000,00',
    status: 'Inscrições abertas'
  },
  {
    id: 4,
    name: 'Torneio Mineiro Sub-20',
    state: 'MG',
    category: 'sub20',
    type: 'torneio',
    startDate: '2023-11-05',
    endDate: '2023-12-05',
    registrationDeadline: '2023-10-20',
    location: 'Belo Horizonte, MG',
    description: 'O Torneio Mineiro Sub-20 de Futebol Feminino é uma competição para atletas com até 20 anos, organizada pela Federação Mineira de Futebol.',
    teams: ['Atlético-MG', 'Cruzeiro', 'América-MG', 'Ipatinga', 'Tupynambás', 'Athletic', 'Democrata', 'Boston City'],
    format: 'Fase única em sistema de mata-mata',
    prize: 'R$ 50.000,00 para o campeão',
    contact: 'competicoes@fmf.org.br',
    website: 'https://www.fmf.org.br',
    registrationFee: 'R$ 2.500,00',
    status: 'Inscrições abertas'
  },
  {
    id: 5,
    name: 'Copa Nordeste Feminina',
    state: 'PE',
    category: 'adulto',
    type: 'copa',
    startDate: '2024-01-15',
    endDate: '2024-03-30',
    registrationDeadline: '2023-12-15',
    location: 'Recife, PE',
    description: 'A Copa Nordeste Feminina é uma competição regional que reúne os principais clubes femininos da região Nordeste do Brasil.',
    teams: ['Sport', 'Náutico', 'Santa Cruz', 'Bahia', 'Vitória', 'Fortaleza', 'Ceará', 'CRB'],
    format: 'Fase de grupos seguida de mata-mata',
    prize: 'R$ 200.000,00 para o campeão',
    contact: 'competicoes@copadonordeste.com.br',
    website: 'https://www.copadonordeste.com.br',
    registrationFee: 'R$ 6.000,00',
    status: 'Inscrições em breve'
  },
  {
    id: 6,
    name: 'Campeonato Brasileiro Feminino A1',
    state: 'DF',
    category: 'adulto',
    type: 'campeonato',
    startDate: '2024-02-10',
    endDate: '2024-09-30',
    registrationDeadline: '2024-01-15',
    location: 'Todo o Brasil',
    description: 'O Campeonato Brasileiro de Futebol Feminino - Série A1 é a principal competição de futebol feminino do Brasil, organizada pela Confederação Brasileira de Futebol.',
    teams: ['Corinthians', 'Palmeiras', 'São Paulo', 'Santos', 'Flamengo', 'Fluminense', 'Internacional', 'Grêmio', 'Cruzeiro', 'Atlético-MG', 'Ferroviária', 'Avaí/Kindermann', 'Real Brasília', 'América-MG', 'Bahia', 'Red Bull Bragantino'],
    format: 'Fase de grupos seguida de mata-mata',
    prize: 'R$ 1.000.000,00 para o campeão',
    contact: 'competicoes@cbf.org.br',
    website: 'https://www.cbf.org.br',
    registrationFee: 'Mediante convite da CBF',
    status: 'Inscrições em breve'
  }
];

export const competitionsService = {
  getCompetitions: (filters = {}) => {
    let filteredCompetitions = [...competitionsData];
    
    // Aplicar filtros
    if (filters.state) {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.state === filters.state);
    }
    
    if (filters.category) {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.category === filters.category);
    }
    
    if (filters.type) {
      filteredCompetitions = filteredCompetitions.filter(comp => comp.type === filters.type);
    }
    
    return filteredCompetitions;
  },
  
  getCompetitionById: (id) => {
    return competitionsData.find(comp => comp.id === parseInt(id)) || null;
  },
  
  getStates: () => {
    return brazilStates;
  },
  
  getCategories: () => {
    return competitionCategories;
  },
  
  getTypes: () => {
    return competitionTypes;
  },
  
  applyForCompetition: (competitionId, teamData) => {
    // Simulação de inscrição em uma competição
    const competition = competitionsData.find(comp => comp.id === parseInt(competitionId));
    
    if (!competition) {
      return { success: false, message: 'Competição não encontrada.' };
    }
    
    if (competition.status !== 'Inscrições abertas') {
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
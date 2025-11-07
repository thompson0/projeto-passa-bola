import React from 'react';
import { Pill } from '@/components/ui';

const CompetitionsList = ({ competitions, selectedCompetition, onSelectCompetition }) => {
  if (!competitions || competitions.length === 0) {
    return (
      <div className="bg-background-light rounded-lg p-6 text-center">
        <p className="text-gray-300">Nenhuma competição encontrada com os filtros selecionados.</p>
      </div>
    );
  }
  
  const getCategoryLabel = (categoryId) => {
    const categories = {
      'adulto': 'Adulto',
      'sub20': 'Sub-20',
      'sub17': 'Sub-17',
      'sub15': 'Sub-15'
    };
    return categories[categoryId] || categoryId;
  };
  
  const getTypeLabel = (typeId) => {
    const types = {
      'campeonato': 'Campeonato',
      'copa': 'Copa',
      'torneio': 'Torneio',
      'amistoso': 'Amistoso'
    };
    return types[typeId] || typeId;
  };
  
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Inscrições abertas':
        return 'primary';
      case 'Em andamento':
        return 'info';
      case 'Inscrições em breve':
        return 'warning';
      case 'Encerrado':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  return (
    <div className="bg-background-light rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Competições</h2>
      
      <div className="space-y-4">
        {competitions.map((competition) => (
          <div 
            key={competition.id}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200
              ${selectedCompetition?.id === competition.id ? 'bg-primary/20 border border-primary' : 'bg-background hover:bg-background-dark border border-transparent'}
            `}
            onClick={() => onSelectCompetition(competition)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-white">{competition.name}</h3>
              <Pill variant={getStatusVariant(competition.status)}>{competition.status}</Pill>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs bg-background-dark text-gray-300 px-2 py-1 rounded">
                {competition.state}
              </span>
              <span className="text-xs bg-background-dark text-gray-300 px-2 py-1 rounded">
                {getCategoryLabel(competition.category)}
              </span>
              <span className="text-xs bg-background-dark text-gray-300 px-2 py-1 rounded">
                {getTypeLabel(competition.type)}
              </span>
            </div>
            
            <p className="text-sm text-gray-300 mb-2">
              {competition.description.substring(0, 100)}...
            </p>
            
            <div className="text-xs text-gray-400">
              Inscrições até: {new Date(competition.registrationDeadline).toLocaleDateString('pt-BR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionsList;
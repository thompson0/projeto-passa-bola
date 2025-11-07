import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Pill } from '@/components/ui';

const CompetitionCard = ({ competition, onApply }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'Inscrições abertas':
        return 'primary';
      case 'Em andamento':
        return 'info';
      case 'Em breve':
        return 'warning';
      case 'Encerrado':
        return 'secondary';
      default:
        return 'secondary';
    }
  };
  
  const getContinentName = (continentId) => {
    const continents = {
      'america-sul': 'América do Sul',
      'america-norte': 'América do Norte',
      'europa': 'Europa',
      'africa': 'África',
      'asia': 'Ásia',
      'oceania': 'Oceania'
    };
    return continents[continentId] || continentId;
  };
  
  const getCategoryName = (categoryId) => {
    const categories = {
      'copa-mundo': 'Copa do Mundo',
      'continental': 'Continental',
      'amistoso': 'Amistoso Internacional',
      'olimpiadas': 'Olimpíadas',
      'sub20': 'Mundial Sub-20'
    };
    return categories[categoryId] || categoryId;
  };
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300">
      {/* Imagem */}
      <div className="relative h-48 w-full">
        <Image
          src={competition.image || '/assets/images/competition-placeholder.jpg'}
          alt={competition.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <Pill variant={getStatusVariant(competition.status)}>{competition.status}</Pill>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">{competition.year}</span>
          <span className="text-sm text-text-secondary">{getContinentName(competition.continent)}</span>
        </div>
        
        <h3 className="text-xl font-bold text-text mb-2">{competition.name}</h3>
        
        <div className="mb-4">
          <span className="text-sm text-text-secondary block mb-1">
            <span className="font-medium text-primary">Local:</span> {competition.location}
          </span>
          <span className="text-sm text-text-secondary block">
            <span className="font-medium text-primary">Período:</span> {new Date(competition.startDate).toLocaleDateString('pt-BR')} a {new Date(competition.endDate).toLocaleDateString('pt-BR')}
          </span>
        </div>
        
        <div className="mb-6">
          <span className="inline-block bg-lilac/10 text-primary text-xs px-2 py-1 rounded-full">
            {getCategoryName(competition.category)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <Link href={`/competicoes-global/${competition.id}`}>
            <Button variant="outline" size="sm">Abrir detalhes</Button>
          </Link>
          
          {competition.registrationOpen ? (
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onApply(competition.id)}
            >
              Inscrever-se
            </Button>
          ) : (
            <Button 
              variant="primary" 
              size="sm"
              disabled
            >
              {competition.status === 'Encerrado' ? 'Encerrado' : 'Em breve'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
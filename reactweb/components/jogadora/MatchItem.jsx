import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill, Button } from '@/components/ui';

const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'hoje':
      return 'primary';
    case 'ao vivo':
      return 'danger';
    case 'finalizado':
      return 'success';
    default:
      return 'info';
  }
};

const getTypeVariant = (type) => {
  switch (type.toLowerCase()) {
    case 'campeonato':
      return 'primary';
    case 'treino':
      return 'info';
    case 'amistoso':
      return 'warning';
    default:
      return 'secondary';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const MatchItem = ({ match, onConfirm }) => {
  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Pill variant={getTypeVariant(match.type)}>{match.type}</Pill>
          <span className="text-sm text-text-secondary">{match.competition}</span>
        </div>
        <Pill variant={getStatusVariant(match.status)}>{match.status}</Pill>
      </div>
      
      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col items-center w-5/12">
          <div className="relative h-12 w-12 mb-2">
            <Image
              src={match.homeImage || '/assets/images/team-placeholder.png'}
              alt={match.home}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-center font-medium">{match.home}</span>
        </div>
        
        <div className="flex flex-col items-center w-2/12">
          <span className="text-lg font-bold">x</span>
        </div>
        
        <div className="flex flex-col items-center w-5/12">
          <div className="relative h-12 w-12 mb-2">
            <Image
              src={match.awayImage || '/assets/images/team-placeholder.png'}
              alt={match.away}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-center font-medium">{match.away}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
        <span>{formatDate(match.date)}</span>
        <span>{match.stadium}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <Link href={match.link}>
          <Button variant="outline" size="sm">Ver detalhes</Button>
        </Link>
        
        {match.confirmed ? (
          <Button variant="ghost" size="sm" disabled>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Presença confirmada
            </span>
          </Button>
        ) : (
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onConfirm && onConfirm(match.id)}
          >
            Confirmar presença
          </Button>
        )}
      </div>
    </div>
  );
};

export default MatchItem;
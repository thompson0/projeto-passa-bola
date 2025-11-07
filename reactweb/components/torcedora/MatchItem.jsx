import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui';

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const MatchItem = ({ match }) => {
  return (
    <Link 
      href={match.link}
      className="block bg-white rounded-lg p-4 hover:shadow-hover transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-secondary">{match.competition}</span>
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
      
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>{formatDate(match.date)}</span>
        <span>{match.stadium}</span>
      </div>
    </Link>
  );
};

export default MatchItem;
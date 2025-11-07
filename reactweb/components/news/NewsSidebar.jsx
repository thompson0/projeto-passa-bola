import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pill } from '@/components/ui';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const NewsSidebar = ({ upcomingMatches }) => {
  if (!upcomingMatches || upcomingMatches.length === 0) return null;
  
  return (
    <div className="bg-background-light rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Próximas partidas</h3>
      
      <div className="space-y-6">
        {upcomingMatches.map((match) => (
          <Link 
            key={match.id}
            href={match.link}
            className="block hover:bg-background-dark p-3 rounded-lg transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-secondary">{match.competition}</span>
              <Pill 
                variant={
                  match.status === 'Hoje' ? 'primary' : 
                  match.status === 'Ao vivo' ? 'danger' : 
                  'info'
                }
              >
                {match.status}
              </Pill>
            </div>
            
            <div className="flex items-center justify-between my-3">
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-10 w-10 mb-1">
                  <Image
                    src={match.homeImage || '/assets/images/team-placeholder.png'}
                    alt={match.home}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-sm font-medium text-white">{match.home}</span>
              </div>
              
              <div className="flex flex-col items-center w-2/12">
                <span className="text-sm font-bold text-white">x</span>
              </div>
              
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-10 w-10 mb-1">
                  <Image
                    src={match.awayImage || '/assets/images/team-placeholder.png'}
                    alt={match.away}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-sm font-medium text-white">{match.away}</span>
              </div>
            </div>
            
            <div className="text-xs text-text-secondary text-center">
              {formatDate(match.date)} • {match.stadium}
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          href="/partidas"
          className="text-primary hover:text-lilac transition-colors text-sm font-medium"
        >
          Ver todas as partidas
        </Link>
      </div>
    </div>
  );
};

export default NewsSidebar;
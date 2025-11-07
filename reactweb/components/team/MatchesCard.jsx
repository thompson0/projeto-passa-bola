import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const MatchesCard = ({ matches }) => {
  return (
    <div className="bg-background-light rounded-lg p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Próximas partidas</h2>
        <Link href="/partidas">
          <Button variant="outline" size="sm">Ver detalhes</Button>
        </Link>
      </div>
      
      <div className="space-y-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-background rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">{formatDate(match.date)}</span>
              <span className="text-sm text-gray-400">{match.competition}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-12 w-12 mb-2">
                  <Image
                    src={match.isHome ? '/assets/images/teams/corinthians.png' : match.opponentLogo}
                    alt={match.isHome ? 'Corinthians' : match.opponent}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-sm font-medium text-white">
                  {match.isHome ? 'Corinthians' : match.opponent}
                </span>
              </div>
              
              <div className="flex flex-col items-center w-2/12">
                <span className="text-lg font-bold text-white">x</span>
              </div>
              
              <div className="flex flex-col items-center w-5/12">
                <div className="relative h-12 w-12 mb-2">
                  <Image
                    src={match.isHome ? match.opponentLogo : '/assets/images/teams/corinthians.png'}
                    alt={match.isHome ? match.opponent : 'Corinthians'}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-center text-sm font-medium text-white">
                  {match.isHome ? match.opponent : 'Corinthians'}
                </span>
              </div>
            </div>
            
            <div className="mt-3 text-center text-xs text-gray-400">
              {match.location}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesCard;